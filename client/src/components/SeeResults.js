import React from 'react'
import { Link, } from 'react-router-dom'

const SeeResults = ({ quiz_id, }) => {
	
	return (
		<div style={styles.buttonWrapper}>
			<button style={styles.buttonStyle}>
				<Link
					style={{textDecoration: "none", color: "#9219ff", }}
					to={{ pathname: "/results", state: { quiz_id: quiz_id, } }}>
				See Results</Link></button></div>
	)
}


const styles = {
	buttonWrapper: {
		display: "flex",
		justifyContent: "center",
		marginTop: "15px"
	},
	buttonStyle: {
  	border: "1px solid",
  	color: "#9219FF",
  	backgroundColor: "white"
	}
}

export default SeeResults;
