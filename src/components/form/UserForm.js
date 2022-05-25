import AppRefInput from '../base/AppRefInput'
import AppLabel from '../base/AppLabel'
import { useEffect, useState, useRef } from 'react'
import * as yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    lastname: yup.string().required("Lastname is required"),
    age: yup.number("Age must be number").integer("Age must be integer").min(18, "At least 18")
        .required("Age is required")
})

export default function UserForm({addUser}) {
    const nameRef = useRef();
    const lastnameRef = useRef();
    const ageRef = useRef();

    const [errors, setErrors] = useState([])

    const MySwal = withReactContent(Swal)

    const changeHandler = () => {
        schema.validate({
            name: nameRef.current.value,
            lastname: lastnameRef.current.value,
            age: ageRef.current.value,
        }, {abortEarly: false})
            .then(_ => setErrors([]))
            .catch(_ => {
                const mapped = _.inner.map(x=> ({
                    path: x.path,
                    msg: x.message
                }))
                setErrors([
                    ...mapped
                ])
            })
    };
    const submitHandler = (e) => {
        e.preventDefault()
        schema.isValid({
            name: nameRef.current.value,
            lastname: lastnameRef.current.value,
            age: ageRef.current.value,
        })
            .then(valid => {
                if(valid) {
                    addUser({
                        name: nameRef.current.value,
                        lastname: lastnameRef.current.value,
                        age: ageRef.current.value,
                    })
                    MySwal.fire(
                        {
                            position: 'top-end',
                            icon: 'success',
                            title: 'A new user has been added',
                            showConfirmButton: false,
                            timer: 1500
                        }
                      )
                } else {
                    MySwal.fire(
                        {
                            position: 'top-end',
                            icon: 'error',
                            title: 'A new user has not been added, validation error(s)',
                            showConfirmButton: false,
                            timer: 1500
                        }
                      )
                }
            })
    }

    return (
        <form onSubmit={submitHandler} onChange={changeHandler}>
            <div className='grid grid-cols-3'>
                <div className='md:col-span-1 col-span-3 pb-4 relative'>
                    <AppLabel content={'Name'}/>
                    <input type='text' 
                        placeholder='name'
                        className="input input-bordered w-full max-w-xs block"
                        ref={nameRef}
                    />
                    <small className='text-red-600 absolute left-6'>
                        { errors.find(x => x.path === 'name')?.msg }
                    </small>
                </div>
                <div className='md:col-span-1 col-span-3 pb-4 relative'>
                    <AppLabel content={'Lastname'}/>
                    <input type='text' 
                        placeholder='lastname'
                        className="input input-bordered w-full max-w-xs block"
                        ref={lastnameRef}
                    />
                    <small className='text-red-600 absolute left-6'>
                        { errors.find(x => x.path === 'lastname')?.msg }
                    </small>
                </div>
                <div className='md:col-span-1 col-span-3 pb-4 relative'>
                    <AppLabel content={'Age (Years)'}/>
                    <input type='number' 
                        placeholder='age'
                        className="input input-bordered w-full max-w-xs block"
                        ref={ageRef}
                    />
                    <small className='text-red-600 absolute left-6'>
                        { errors.find(x => x.path === 'age')?.msg }
                    </small>
                </div>
                <div className='col-span-3 mt-2'>
                    <button type='submit' className="btn btn-active btn-accent text-white w-full">
                        Button
                    </button>
                </div>
            </div>
        </form>
    )
}