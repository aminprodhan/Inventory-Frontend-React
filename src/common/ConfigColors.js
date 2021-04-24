

export const GetRandColors=()=>{
    const min = 0;
    const max = 4;
    const rand = parseInt(min + Math.random() * (max - min));
    const colors=["bg-primary",
    "bg-success","bg-danger","bg-warning","bg-dark"];

    return colors[rand];
}

export const GetRandBsColors=()=>{
    const min = 0;
    const max = 4;
    const rand = parseInt(min + Math.random() * (max - min));
    const colors=["primary",
    "success","danger","warning","info"];

    return colors[rand];
}