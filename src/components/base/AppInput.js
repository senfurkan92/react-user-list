export default function AppInput({type, placeholder, propName, obj, setObj}) {
    const inputHandler = (e) => {
        let updated = {...obj}
        updated[propName] = type === 'number' ? Number(e.target.value) : e.target.value
        setObj(updated)
    }

    return (
        <input type={type} 
            placeholder={placeholder} 
            className="input input-bordered w-full max-w-xs block"
            value={obj[propName]}
            onInput={inputHandler}
        />
    )
}