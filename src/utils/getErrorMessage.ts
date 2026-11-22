import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    if (error.response) {
      return error.response.data?.message ?? "Something went wrong";
    }
    return "Cannot reach the server. Check your connection.";
  }
  return error instanceof Error ? error.message : "Something went wrong";
}
