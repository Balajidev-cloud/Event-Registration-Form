import { useState } from "react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  eventType: "",
  date: "",
  participants: "",
  message: "",
};

const eventOptions = [
  "Tech Conference",
  "Workshop",
  "Hackathon",
  "Webinar",
  "Cultural Event",
  "Sports Meet",
];

function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Name is required";
  else if (form.fullName.trim().length < 3) errors.fullName = "Min 3 characters";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Invalid email format";

  if (!form.phone.trim()) errors.phone = "Phone is required";
  else if (!/^[6-9]\d{9}$/.test(form.phone))
    errors.phone = "Enter valid 10-digit Indian mobile number";

  if (!form.eventType) errors.eventType = "Please select an event";

  if (!form.date) errors.date = "Date is required";
  else if (new Date(form.date) < new Date().setHours(0, 0, 0, 0))
    errors.date = "Date must be today or future";

  if (!form.participants) errors.participants = "Required";
  else if (isNaN(form.participants) || Number(form.participants) < 1)
    errors.participants = "Min 1 participant";

  return errors;
}

export default function EventRegistrationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialForm).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}>
        <div className="card shadow-lg border-0 text-center p-5" style={{ maxWidth: 480, borderRadius: 20 }}>
          <div className="mb-3">
            <span style={{ fontSize: 64 }}>🎉</span>
          </div>
          <h2 className="fw-bold text-success mb-2">Registration Successful!</h2>
          <p className="text-muted mb-1">
            Hey <strong>{form.fullName}</strong>, you're registered for
          </p>
          <p className="fw-semibold fs-5 text-primary mb-1">{form.eventType}</p>
          <p className="text-muted small mb-4">
            📅 {form.date} &nbsp;|&nbsp; 👥 {form.participants} participant(s)
          </p>
          <p className="text-muted small mb-4">
            Confirmation sent to <strong>{form.email}</strong>
          </p>
          <button className="btn btn-primary px-4 py-2 rounded-pill" onClick={handleReset}>
            Register Another ↩
          </button>
        </div>
      </div>
    );
  }

  const Field = ({ label, name, type = "text", children, required }) => (
    <div className="mb-3">
      <label className="form-label fw-semibold small text-secondary text-uppercase" style={{ letterSpacing: 1 }}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`form-control form-control-lg ${errors[name] ? "is-invalid" : touched[name] && !errors[name] ? "is-valid" : ""}`}
          style={{ borderRadius: 10, fontSize: 15 }}
        />
      )}
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center py-5 px-3"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
      >
        <div className="w-100" style={{ maxWidth: 560 }}>
          {/* Header */}
          <div className="text-center mb-4">
            <span
              className="badge px-3 py-2 mb-3 text-uppercase"
              style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8", letterSpacing: 2, fontSize: 11, borderRadius: 20 }}
            >
              🎟 Event Portal
            </span>
            <h1 className="fw-bold text-white" style={{ fontSize: "2rem" }}>
              Register for an Event
            </h1>
            <p className="text-secondary small">Fill in your details to secure your spot</p>
          </div>

          {/* Card */}
          <div className="card border-0 shadow-lg" style={{ borderRadius: 20 }}>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit} noValidate>

                {/* Row: Name + Email */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <Field label="Full Name" name="fullName" required />
                  </div>
                  <div className="col-md-6">
                    <Field label="Email Address" name="email" type="email" required />
                  </div>
                </div>

                {/* Row: Phone + Participants */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <Field label="Phone Number" name="phone" type="tel" required />
                  </div>
                  <div className="col-md-6">
                    <Field label="No. of Participants" name="participants" type="number" required />
                  </div>
                </div>

                {/* Event Type */}
                <Field label="Event Type" name="eventType" required>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`form-select form-select-lg ${errors.eventType ? "is-invalid" : touched.eventType && !errors.eventType ? "is-valid" : ""}`}
                    style={{ borderRadius: 10, fontSize: 15 }}
                  >
                    <option value="">-- Select Event --</option>
                    {eventOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.eventType && <div className="invalid-feedback">{errors.eventType}</div>}
                </Field>

                {/* Date */}
                <Field label="Event Date" name="date" type="date" required />

                {/* Message */}
                <div className="mb-4">
                  <label className="form-label fw-semibold small text-secondary text-uppercase" style={{ letterSpacing: 1 }}>
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requirements or queries..."
                    className="form-control"
                    style={{ borderRadius: 10, fontSize: 15, resize: "none" }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 fw-bold fs-5"
                  style={{ borderRadius: 12, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", border: "none" }}
                >
                  Register Now 🚀
                </button>

                <p className="text-center text-muted small mt-3 mb-0">
                  Your info is safe with us. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
