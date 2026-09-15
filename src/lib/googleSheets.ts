export interface OrderPayload {
  order_id: string;
  name: string;
  whatsapp: string;
  category: string;
  size_preference: string;
  quality: string;
  quantity: number;
  requirements: string;
  location: string;
  status: string;
}

export interface SubmitOrderResponse {
  success: boolean;
  message?: string;
  order_id?: string;
}

// Canonical permanent Google Apps Script Web App POST endpoint
export const PERMANENT_EXEC_URL =
  "https://script.google.com/macros/s/AKfycbxZJOeEJYe0Iia5mPe7-yEAOAPz1sJlZeLuPUMMCB7RD4uxFbqqjy7eb4DjBSF-qqxA/exec";

/**
 * Resolves the valid permanent /exec endpoint.
 * Guards against:
 * 1. Stale spreadsheet URLs (docs.google.com/spreadsheets/...)
 * 2. Temporary redirected GET/echo URLs (script.googleusercontent.com/macros/echo?...)
 * 3. Typo variants in deployment IDs
 */
function resolveEndpointUrl(rawUrl?: string): string {
  const trimmed = (rawUrl || "").trim();
  if (
    trimmed &&
    trimmed.startsWith("https://script.google.com/macros/s/") &&
    trimmed.endsWith("/exec") &&
    !trimmed.includes("docs.google.com") &&
    !trimmed.includes("AKfycbxZJOEJYe0") // Guard against 2-char typo variant
  ) {
    return trimmed;
  }
  return PERMANENT_EXEC_URL;
}

export const GOOGLE_SHEETS_SCRIPT_URL = resolveEndpointUrl(
  import.meta.env.VITE_GOOGLE_SHEETS_URL
);

/**
 * Submits the order payload to the permanent Google Apps Script Web App endpoint.
 * - Uses 'Content-Type: text/plain;charset=utf-8' to prevent CORS preflight blocks.
 * - Uses 'redirect: follow' to follow Google Apps Script's 302 redirect to the JSON output.
 * - Strictly verifies that response.ok is true AND parsed JSON has success === true.
 */
export async function submitOrderToGoogleSheets(
  payload: OrderPayload
): Promise<SubmitOrderResponse> {
  const endpoint = GOOGLE_SHEETS_SCRIPT_URL;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        order_id: payload.order_id,
        name: payload.name,
        whatsapp: payload.whatsapp,
        category: payload.category,
        size_preference: payload.size_preference,
        quality: payload.quality,
        quantity: payload.quantity,
        requirements: payload.requirements,
        location: payload.location,
        status: payload.status,
      }),
      redirect: "follow",
    });

    if (!response.ok) {
      console.error(`Google Sheets endpoint error: ${response.status} ${response.statusText}`);
      return {
        success: false,
        message: "Unable to submit your order right now. Please try again or reach out on WhatsApp.",
      };
    }

    // Google Apps Script returns JSON response via the 302 redirect
    const rawText = await response.text();

    // Check if the response was HTML (such as Google Drive/Script error page)
    if (!rawText || rawText.trim().startsWith("<") || rawText.includes("<!DOCTYPE") || rawText.includes("<html")) {
      console.error("Google Sheets returned HTML instead of expected JSON:", rawText.slice(0, 300));
      return {
        success: false,
        message: "Unable to save order to Google Sheets. Please check your connection or reach out on WhatsApp.",
      };
    }

    let data: Record<string, unknown>;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      console.error("Failed to parse Google Sheets response as JSON:", parseErr, rawText);
      return {
        success: false,
        message: "Received invalid response from Google Sheets. Please reach out on WhatsApp.",
      };
    }

    // Strictly verify success === true from Apps Script
    if (data && data.success === true) {
      return {
        success: true,
        order_id: (typeof data.order_id === "string" ? data.order_id : payload.order_id),
        message: (typeof data.message === "string" ? data.message : "Order saved successfully."),
      };
    }

    // Explicit unsuccessful status returned by the script
    const scriptErrorMessage =
      (typeof data.error === "string" && data.error) ||
      (typeof data.message === "string" && data.message) ||
      "Google Sheets returned an unsuccessful status.";

    console.error("Google Sheets returned unsuccessful response:", data);
    return {
      success: false,
      message: scriptErrorMessage,
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Network request failed";
    console.error("Network error submitting to Google Sheets:", errorMessage);
    return {
      success: false,
      message: "Network error: Unable to submit your order. Please check your internet connection and try again.",
    };
  }
}
