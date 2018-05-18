import React from "react";
import classNames from "classnames";

export interface FAIconProps extends React.HTMLAttributes<HTMLElement> {
    icon: string,
    type: "solid" | "regular",
}

export const FAIcon: React.StatelessComponent<FAIconProps> = function FAIcon(props) {
    const {type, icon, className, ...other} = props;
    const classes = classNames(className, `fa${type[0]} fa-${icon}`);
    return <i className={classes} {...other}/>;
};