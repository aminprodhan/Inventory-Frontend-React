import React, { Component, useState, useEffect } from "react";

export const CheckBoxRole = props => {
    return (
        <div className="col-3">
            <input key={props.id} onClick={props.handleCheckChieldElement}
            type="checkbox" checked={props.isChecked}
            value={props.id} /> {props.name} {props.isChecked}
       </div>
    )
}

export default CheckBoxRole
