const PasswordInput = ({label, placeholder, value, setValue}) => {
    return (
        <div className="flex flex-col space-y-1 w-full my-3">
                <label for="{label}" className="font-semibold">{label}</label>
            
                <input type="password" placeholder={placeholder}
                className="p-2 border border-gray-500 rounded placeholder-gray-500"
                id="{label}"
                value = {value}
                onChange={(e) =>{
                    setValue(e.target.value);
                }}></input>
        </div>
    );

}

export default PasswordInput;