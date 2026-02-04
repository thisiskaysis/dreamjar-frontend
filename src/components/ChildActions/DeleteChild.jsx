import { useChildActions } from "../../hooks/useChildActions";

function DeleteChild({ childId, setChildren }) {
    const { removeChild } = useChildActions();

    const handleRemoveChild = async (childId) => {
        const confirmDelete = confirm("Are you sure you want to delete this child?");
        if (!confirmDelete) return;

        try {
            await removeChild(childId);

            setChildren((prev) =>
                prev.filter((child) => child.id !== childId)); // Update UI
            alert("Child deleted successfully")
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <button onClick={handleRemoveChild}>Delete Child   
            </button>
        </div>
    )
}

export default DeleteChild;