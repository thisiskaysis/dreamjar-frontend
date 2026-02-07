function getChildAvatar(child) {
    if (child?.profile_picture) return child.profile_picture;
    if (child?.gender === "male") return "/default-avatar-male.svg";
    if (child?.gender === "female") return "/default-avatar-female.svg";
    return "/default-avatar-nogender.svg";
}

export default getChildAvatar;