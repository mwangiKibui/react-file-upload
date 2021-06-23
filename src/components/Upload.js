import React,{useState} from 'react'

export default function Upload() {

    const [image,setImage] = useState("");
    const [error,setError] = useState("");

    const uploadImage = e => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = e => {
        e.preventDefault();

        // compose the form data
        let form_data = new FormData();
        // add the image to the form data
        form_data.append("image",image);
        // submit...

        try{
            fetch({
                url:"<your-api-url>",
                method:"post",
                body:form_data
            })
            .then(res => {
                res.json().then(result => {
                    console.log("result",result);
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
            <input type="file" id="image" name="image" onChange={uploadImage} multiple={false} required={true}/>
            <br />
            <br />
            <button type="submit">Submit</button> 
        </form>
    )
}
