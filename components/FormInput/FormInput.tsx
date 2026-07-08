interface InputReqs {
    label: string;
    error?: string;
    setValue: (event : any) => void;
    isPassword?: boolean;
}

export default function FormInput({label, setValue, error="", isPassword=false} : InputReqs) {

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <div>
            <label>{label}</label>
            <div className="flex flex-col">
                <input type={isPassword ? "password" : "text"} onChange={(e) => handleChange(e)} className="p-1 border rounded-xl border-gray bg-white"></input>
                {error && <small>*{error}</small>}
            </div>
            
        </div>
    )
}