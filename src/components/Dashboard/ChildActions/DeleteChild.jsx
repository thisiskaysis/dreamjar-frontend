import { useChildActions } from "../../../hooks/useChildActions";

function DeleteChild({ childId, setChildren }) {
  const { removeChild } = useChildActions();

  const handleRemoveChild = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this child?",
    );
    if (!confirmDelete) return;

    try {
      await removeChild(childId);

      setChildren((prev) => prev.filter((child) => child.id !== childId)); // Update UI
      alert("Child deleted successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
    className="w-full py-3 rounded-xl cursor-pointer bg-red-200 text-red-600 hover:bg-red-300 transition"
    onClick={handleRemoveChild}>
      Delete Child
    </button>
  );
}

export default DeleteChild;
