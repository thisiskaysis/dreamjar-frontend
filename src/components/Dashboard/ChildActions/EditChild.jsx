import { useChildActions } from "../../../hooks/useChildActions";

function EditChild({ childId, setChildren }) {
    const { editChild } = useChildActions();

    const handleEditChild = async () => {
        const newName = prompt("Edit child's name", child.name)
        const newDob = prompt("Edit date of birth", child.date_of_birth);

        if (!newName || !newDob) return;

        try {
            const updatedChild = await editChild(child.id, {
                name: newName,
                date_of_birth: newDob,
            });

            setChildren((prev) =>
            prev.map((c) => 
            c.id === child.id ? updatedChild : c));
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <button onClick={handleEditChild}>Edit Child</button>
    )
}

export default EditChild;