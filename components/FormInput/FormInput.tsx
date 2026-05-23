interface InputReqs {
    label: string;
    error?: string;
    setValue: (event : any) => void;
}

export default function FormInput({label, setValue, error=""} : InputReqs) {

    const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <div>
            <label>{label}</label>
            <div className="flex flex-col">
                <input onChange={(e) => handleChange(e)} className="p-1 border rounded-xl border-gray bg-white" type="text"></input>
                {error && <small>*{error}</small>}
            </div>
            
        </div>
    )
}