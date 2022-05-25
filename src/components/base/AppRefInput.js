export default function AppRefInput({type, placeholder, pref}) {
    return (
        <input type={type} 
            placeholder={placeholder} 
            className="input input-bordered w-full max-w-xs block"
            ref={pref}
        />
    )
}