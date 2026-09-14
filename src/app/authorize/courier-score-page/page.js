// In your Admin page or a new page

import CourierHistoryLookup from "@/app/components/CourierHistoryLookup";
import ProtectedRoute from "@/app/components/ProtectedRoute";

// import CourierScoreLookup from "@/app/components/CourierScoreLookup";

export default function AdminCourierScorePage() {
  return (
     <ProtectedRoute pageKey="courier_score">
    <div className="min-h-screen bg-[#E2E7EA]/20">
      {/* <CourierScoreLookup /> */}
      <CourierHistoryLookup />
    </div>
    </ProtectedRoute>
  );
}