
/***
 * @function iconSystem
 * @param {string} icon_src - The source path of the icon image.
 * @param {string} icon_name - The alt text for the icon image.
 * @param {string} classNamePicture - The CSS class for the picture element.
 * @param {string} classNameImg - The CSS class for the img element.
 * @returns {JSX.Element} A JSX element representing the icon.
 */
export const  IconSystem=({iconSrc, iconName, classNamePicture, classNameImg})=>{
    return (
        <picture className={classNamePicture}>
            <img src={iconSrc} alt={iconName} className={classNameImg} />
        </picture>

    );
}