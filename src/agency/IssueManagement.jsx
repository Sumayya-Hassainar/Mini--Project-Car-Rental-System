import { useSelector, useDispatch } from "react-redux";
import { updateIssueStatus } from "../redux/issueSlice";

export default function IssueManagement() {
  const issues = useSelector((state) => state.issues);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Reported Issues</h1>

      {issues.length === 0 ? (
        <p className="text-gray-500">No issues reported yet.</p>
      ) : (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold">Car ID: {issue.carId}</h2>
              <p><strong>Issue:</strong> {issue.issue}</p>
              <p><strong>Description:</strong> {issue.description}</p>
              <p>
                <strong>Status:</strong> 
                <span className={`ml-2 ${issue.status === "Resolved" ? "text-green-600" : "text-yellow-600"}`}>
                  {issue.status}
                </span>
              </p>

              <div className="mt-3 space-x-2">
                <button
                  onClick={() => dispatch(updateIssueStatus({ id: issue.id, status: "Pending" }))}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Pending
                </button>
                <button
                  onClick={() => dispatch(updateIssueStatus({ id: issue.id, status: "Resolved" }))}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
