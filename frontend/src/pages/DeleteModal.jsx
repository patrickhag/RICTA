import { useNavigate } from "react-router-dom";
const API_BASE = "http://localhost:9000/api/students";

export default function DeleteModal(props) {
  const navigateTo = useNavigate();
  const hideModal = (e) => {
    e.preventDefault();
    props.setShowDeleteModal(!props.showDeleteModal);
  };

  const deleteStudent = async (e) => {
    e.preventDefault();
    try {
      const req = await fetch(`${API_BASE}/delete/${props.id}`, {
        method: "DELETE",
      });
      const res = await req.json();
      console.log(res);
      if (res.status === "ok") {
        navigateTo("/");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="w3-container">
      <div
        style={{ display: `${props.showDeleteModal ? "block" : "none"}` }}
        className="w3-modal w3-round-large"
      >
        <div className="w3-modal-content w3-animate-zoom w3-card-4 w3-round-large">
          <span onClick={hideModal} className="w3-button w3-display-topright">
            &times;
          </span>
          <form className="w3-container w3-center w3-padding">
            <h3>Are you sure you want to cancel your application</h3>
            <button
              className="w3-button w3-blue w3-round-large w3-margin-top"
              onClick={deleteStudent}
            >
              Yes, sure
            </button>
            <button
              className="w3-margin-left w3-button w3-round-large w3-margin-top"
              onClick={hideModal}
            >
              No, I'm not
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
