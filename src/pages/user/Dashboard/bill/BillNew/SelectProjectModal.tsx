import { useEffect, useMemo, useState } from "react"
import BaseStateClass from "../../../components/helper/BaseStateClass"
import { Button, Modal } from "react-bootstrap"
import ProjectService, { ProjectType } from "../../services/ProjectService"
import { debounce, DebouncedFunc } from "lodash-es"

export type PropType = {
    show: boolean
    onListener: {
        (props: {
            action: string
            return: any
        }): void
    }
}

export type StateType = {
    form_query: any
    project_data: ProjectType
    project_datas: Array<ProjectType>

}

class SelectProjectModalClass extends BaseStateClass<StateType, PropType> {
    declare pendingSearch: DebouncedFunc<any>

    async mounted() {
        this.setProjects(await this.getProjects())
    }

    handleClose(action?: string | null) {
        if (action == "SUBMIT") {
            return this.props.onListener({
                action: "SUBMIT",
                return: this.state.project_data
            })
        }
        this.props.onListener({
            action: "CLOSE",
            return: null
        })
    }

    async getProjects() {
        try {
            let form_query = this.state.form_query
            let resData = await ProjectService.gets(form_query);
            return resData
        } catch (error) {
            console.error("getProjects - err :: ", error);
        }
    }

    setProjects(props: any) {
        if (props == null) return
        let _return = props.return;
        this.setState({
            project_datas: _return
        })
    }

    handleClickItem(props?: any, e?: any) {
        let project_datas = this.state.project_datas;
        this.setState({
            project_data: project_datas[props.index]
        })
    }

    handleChangeSearch(props: any, e?: any) {
        let form_query = this.state.form_query
        form_query = {
            ...form_query,
            [e.target.name] : e.target.value
        }
        this.setState({
            form_query
        })

        if(this.pendingSearch != null){
            this.pendingSearch.cancel()
        }

        this.pendingSearch = debounce(()=>{
            this.mounted()
        },1000);

        this.pendingSearch()
    }

    render() {
        let project_datas = this.state.project_datas || [];
        let project_data = this.state.project_data
        return <Modal show={this.props.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
                <Modal.Title>Select Project Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Search Project</label>
                    <input
                        type="text"
                        className="form-control"
                        name="search_text"
                        onChange={this.handleChangeSearch.bind(this, {})}
                        placeholder="Input placeholder"
                    />
                </div>
                <div className="mb-3">
                    <div className="list-group list-group-flush">
                        {project_datas.map((val, i) => {
                            return <div key={val.id} className={"list-group-item " + (project_data.id == val.id ? "active" : "")} onClick={this.handleClickItem.bind(this, {
                                id: val.id,
                                index: i
                            })}>
                                <div className="row align-items-center">
                                    {/* <div className="col-auto">
                                    <input type="checkbox" className="form-check-input" />
                                </div> */}
                                    <div className="col-auto">
                                        <div>
                                            <span
                                                className="avatar"
                                                style={{ backgroundImage: "url(./static/avatars/003f.jpg)" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col text-truncate">
                                        <a href="#" className="text-reset d-block">
                                            {val.name}
                                        </a>
                                        <div className="d-block text-secondary text-truncate mt-n1">
                                            {val.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose.bind(this, null)}>
                    Close
                </Button>
                <Button variant="primary" onClick={this.handleClose.bind(this, "SUBMIT")}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    }
}

export default function SelectProjectModal(props: PropType) {

    let methods = useMemo(() => new SelectProjectModalClass(), []);

    methods.defineState(useState<StateType>({
        form_query: {},
        project_datas: [],
        project_data: {}
    }), props);

    useEffect(()=>{
        if(props.show == false) return
        methods.mounted()
    },[props.show])

    return methods.render()
}