import React,{useState} from 'react'

export default function Upload() {

    const [image,setImage] = useState("");
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");

    const uploadImage = e => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = e => {
        e.preventDefault();

        // reset the error
        setError("");
        // reset the message
        setMessage("");

        // compose the form data
        let form_data = new FormData();
        // add the image to the form data
        form_data.append("image",image);
        // submit...

        try{
            fetch("http://159.203.7.235:8000/api/upload_image_test/",{
                method:"POST",
                body:form_data
            })
            .then(res => {
                res.json().then(result => {
                    return setMessage(result.message);
                })
            })
        }catch(error){
            setError(new Error(error).message);
        }      

    }

    return (
        <form onSubmit={handleSubmit}>
            {
                error ? (
                    <p style={{color:"red"}}>{error}</p>
                ) : null
            }
            {
                message ? (
                    <p style={{color:"green"}}>{message}</p>
                ) : null
            }
            <input type="file" id="image" name="image" onChange={uploadImage} multiple={false} required={true}/>
            <br />
            <br />
            <button type="submit">Submit</button> 
        </form>
    )
}
