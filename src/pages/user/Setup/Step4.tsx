import { useEffect, useMemo, useState } from "react"
import ReactSvg from "../../../assets/react.svg"
import { PropType, StateType, Step1Class } from "./Step1"
import { debounce } from "lodash-es";

export class Step4Class extends Step1Class {
    handleChange(e?: any) {
        let form_data = this.state.form_data
        switch (e.target.name) {
            case "logo":
                this.setState({
                    form_data: {
                        ...form_data,
                        [e.target.name]: e.target.files?.[0]
                    }
                })
                if (this.pendingOnChange != null) {
                    this.pendingOnChange.cancel()
                }

                let logo_string = ""
                const file = e.target.files?.[0]; // Get the first selected file

                if (file) {
                    // Check if the file is an image
                    if (!file.type.startsWith('image/')) {
                        alert('Please select a valid image file.');
                        return;
                    }

                    // Create an image object to check the dimensions
                    const img = new Image();
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        if (reader.result) {
                            img.src = reader.result as string;
                        }
                    };

                    img.onload = () => {
                        // Check if the image's width and height are within the max dimensions (1000px)
                        if (img.width > 1000 || img.height > 1000) {
                            alert('Image dimensions should not exceed 1000px in width or height.');
                        } else {
                            // If valid, set the image and clear the error message
                            logo_string = reader.result as string
                            this.setState({
                                form_data: {
                                    ...this.state.form_data,
                                    logo_string: logo_string
                                }
                            })
                            setTimeout(() => {
                                this.pendingOnChange = debounce(() => {
                                    this.props.onChange({
                                        target: {
                                            name: this.props.name,
                                            value: this.state.form_data
                                        }
                                    })
                                }, 1000)
                                this.pendingOnChange()
                            }, 1000);
                        }
                    };

                    reader.readAsDataURL(file); // Read the file as a Data URL
                }

                break;
        }
    }

    render() {
        return <>
            <div className="card-body text-center py-4 p-sm-5">
                <img src={ReactSvg} style={{ width: "100px", height: "auth" }}></img>
                <h1 className="mt-5">Welcome to Bill App!</h1>
                <p className="text-secondary">
                    Tabler comes with tons of well-designed components and features. Start
                    your adventure with Tabler and make your dashboard great again.
                </p>
            </div>
            <div className="hr-text hr-text-center hr-text-spaceless">your data</div>
            <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Upload Logo</label>
                    <div className="input-group input-group-flat">
                        <span className="input-group-text"></span>
                        <input
                            type="file"
                            className="form-control ps-1"
                            autoComplete="off"
                            name="logo"
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="form-hint">
                        Upload your copmany logo.
                    </div>
                </div>
                {["", null].some((val, i) => val == this.state.form_data.logo_string) ? null :
                    <div className="mb-3">
                        <img src={this.state.form_data.logo_string} alt="Selected Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                    </div>
                }
            </div>
        </>
    }
}

export default function Step4(props: PropType) {

    let methods = useMemo(() => new Step4Class(), []);

    methods.defineState(useState<StateType>({
        form_data: props.value
    }), props);

    useEffect(() => {
        methods.setState({
            form_data: props.value
        })
    }, [props.value])

    return methods.render()

}