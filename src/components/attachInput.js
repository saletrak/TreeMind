import React from "react"
import {connect} from "react-redux"

import styles from "css/subjects.module.css";
import {removeAttachSubjectChild, setAttachSubjectChild} from "store/reducers/subjectReducer";


class AttachInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			helper: false,
			helperItems: [
				{id: 1, name: 'aaa'},
				{id: 2, name: 'aab'},
				{id: 3, name: 'aac'}
			]
		};

		this.$attachInput = React.createRef();

		this.handleClickHelper = this.handleClickHelper.bind(this);
		this.handleChangeInput = this.handleChangeInput.bind(this);
		this.handleInputBlur = this.handleInputBlur.bind(this);
		this.handleClickRemoveAttach = this.handleClickRemoveAttach.bind(this);
	}

	handleClickHelper(ev) {
		let attachId = ev.target.getAttribute("data-subjectid");
		this.props.dispatch(setAttachSubjectChild(this.props.subjectId, this.props.childId, attachId));
		this.setState({...this.state, helper: false});
	}

	handleChangeInput(ev) {
		if (ev.target.value !== "") this.setState({...this.state, helper: true});
		else this.setState({...this.state, helper: false});
	}

	handleClickRemoveAttach() {
		this.props.dispatch(removeAttachSubjectChild(this.props.subjectId, this.props.childId));
	}

	handleInputBlur(ev) {
		if (ev.target.value !== "") this.setState({...this.state, helper: true});
	}

	render() {
		return (
			<>
				{this.props.visible || this.props.data ? (
					<div className={styles.attach}>
						<i className={["material-icons", styles.icon].join(" ")}>link</i>
						<div className={styles.attach_input_wrapper}>
							{this.props.data && this.props.subjects[this.props.data] && !this.props.subjects[this.props.data].removed ? (
								<div className={styles.attach_link}>
									<a href={"#subjectId_" + this.props.data} className={""}>{this.props.subjects[this.props.data].name}</a>
								</div>
							) : (
								<input type='text'
									   className={styles.attach_input}
									   ref={this.$attachInput}
									   onChange={this.handleChangeInput}
									   onBlur={this.handleInputBlur}/>
							)}
							{this.state.helper ? (
								<div className={styles.helper}>
									{Object.keys(this.props.subjects).map(key => {
										if (this.props.subjects[key].removed) return null;
										return <div onClick={this.handleClickHelper} data-subjectid={key}
													className={styles.helper_item}
													key={key}>{this.props.subjects[key].name}</div>

									})}
								</div>
							) : null}
						</div>
						{this.props.data && this.props.subjects[this.props.data] && !this.props.subjects[this.props.data].removed ? (
							<i className={["material-icons", styles.btn_remove].join(" ")}
							   onClick={this.handleClickRemoveAttach}>clear</i>
						) : null}
					</div>
				) : null}
			</>
		)
	}
}

export default connect(state => ({
	subjects: state.subjects,
	settings: state.settings,
}), null)(AttachInput)