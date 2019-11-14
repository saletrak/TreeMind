import React from "react"
// import PropTypes from "prop-types"
import {connect} from "react-redux"

import styles from 'css/header.module.css';
import {saveSubjects} from "store/reducers/subjectReducer";


class Header extends React.Component {
	constructor(props) {
		super(props);

		this.saveSubjects = this.saveSubjects.bind(this);
	}

	saveSubjects() {
		console.log(JSON.stringify(this.props.subjects));
		this.props.dispatch(saveSubjects(JSON.stringify(this.props.subjects)));
	}

	render() {
		return (
			<div className={styles.header}>
				<div>TreeMind</div>
				<i className={["material-icons", styles.icon].join(" ")} onClick={this.saveSubjects}>save</i>
			</div>
		)
	}
}

// Header.propTypes = {
// 	children: PropTypes.node.isRequired,
// }

export default connect(state => ({
	subjects: state.subjects,
}), null)(Header)