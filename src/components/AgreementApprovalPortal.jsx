import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AgreementApprovalPortal() {
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    title: "",
    department: "",
    draftFile: null,
    supportFile: null,
    status: "Draft Submitted"
  });
  const [submitted, setSubmitted] = useState(false);
  const [agreements, setAgreements] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setAgreements((prev) => [...prev, form]);
  };

  const handleFinanceApproval = () => {
    setForm((prev) => ({ ...prev, status: "Finance Approved" }));
  };

  const handleMDApproval = () => {
    setForm((prev) => ({ ...prev, status: "MD Approved" }));
  };

  const handleRejection = () => {
    setForm((prev) => ({ ...prev, status: "Rejected" }));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Agreement Approval Portal</h1>

      <div className="mb-6">
        <Label>Select Role</Label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded px-3 py-2 mt-1"
        >
          <option value="user">User</option>
          <option value="finance">Finance</option>
          <option value="md">MD</option>
        </select>
      </div>

      {!submitted && role === "user" ? (
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Agreement Title</Label>
              <Input name="title" onChange={handleChange} required />
            </div>

            <div>
              <Label>Department</Label>
              <Input name="department" onChange={handleChange} required />
            </div>

            <div>
              <Label>Upload Draft Agreement</Label>
              <Input name="draftFile" type="file" accept=".pdf,.doc,.docx" onChange={handleChange} required />
            </div>

            <div>
              <Label>Upload Supporting Documents</Label>
              <Input name="supportFile" type="file" accept=".pdf,.doc,.docx" onChange={handleChange} required />
            </div>

            <Button type="submit">Submit for Finance Approval</Button>
          </form>
        </Card>
      ) : (
        <Card className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Agreement Details</h2>
          <p><strong>Title:</strong> {form.title}</p>
          <p><strong>Department:</strong> {form.department}</p>
          <p className="my-4">Status: <strong>{form.status}</strong></p>

          {role === "finance" && form.status === "Draft Submitted" && (
            <div className="space-x-4">
              <Button onClick={handleFinanceApproval}>Approve as Finance</Button>
              <Button variant="destructive" onClick={handleRejection}>Reject</Button>
            </div>
          )}

          {role === "md" && form.status === "Finance Approved" && (
            <div className="space-x-4">
              <Button onClick={handleMDApproval}>Approve as MD</Button>
              <Button variant="destructive" onClick={handleRejection}>Reject</Button>
            </div>
          )}

          {(form.status === "MD Approved") && (
            <p className="mt-4 text-green-600 font-semibold">Agreement Fully Approved ✅</p>
          )}

          {(form.status === "Rejected") && (
            <p className="mt-4 text-red-600 font-semibold">Agreement Rejected ❌</p>
          )}
        </Card>
      )}

      {agreements.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">All Submitted Agreements</h2>
          {agreements.map((a, idx) => (
            <Card key={idx} className="p-4 mb-4">
              <p><strong>Title:</strong> {a.title}</p>
              <p><strong>Department:</strong> {a.department}</p>
              <p><strong>Status:</strong> {a.status}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
