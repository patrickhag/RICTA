const API_BASE = "http://localhost:9000/api/students";

export default function UpdateModal({
  student,
  setShowUpdateModal,
  showUpdateModal,
  setStudent,
}) {
  async function updateStudent(e) {
    e.preventDefault();
    const response = await fetch(`${API_BASE}/update/${student._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: student.email,
        description: student.description,
        address: student.address,
      }),
    });
    hideModal();
  }
  const hideModal = () => {
    setShowUpdateModal(!showUpdateModal);
  };

  return (
    <div className="w3-container">
      <div
        style={{ display: `${showUpdateModal ? "block" : "none"}` }}
        className="w3-modal w3-round-large"
      >
        <div className="w3-modal-content w3-animate-zoom w3-card-4 w3-round-large">
          <span onClick={hideModal} className="w3-button w3-display-topright">
            &times;
          </span>
          <form className="w3-container w3-padding">
            <h2 className="w3-text-blue">Edit your Info</h2>

            <label className="w3-text-blue">
              <b>Email</b>
            </label>
            <input
              className="w3-input w3-border"
              type="text"
              name="title"
              onChange={(e) => {
                setStudent({ ...student, email: e.target.value });
              }}
              value={student?.email}
              required
            />

            <label className="w3-text-blue">
              <b>Description</b>
            </label>
            <textarea
              className="w3-input w3-border"
              name="description"
              value={student?.description}
              onChange={(e) => {
                setStudent({ ...student, description: e.target.value });
              }}
              required
            ></textarea>
            <label className="w3-text-blue">
              <b>Address</b>
            </label>
            <input
              className="w3-input w3-border"
              type="text"
              name="title"
              value={student?.address}
              onChange={(e) => {
                setStudent({ ...student, address: e.target.value });
              }}
              required
            />

            <button
              className="w3-button w3-blue w3-round-large w3-margin-top"
              onClick={updateStudent}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
