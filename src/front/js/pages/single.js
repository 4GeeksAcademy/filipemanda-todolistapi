import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext";

export const Single = () => {

	const { store, actions } = useContext(Context)


	return (
		<div className="jumbotron">
			SINGLE
			<hr className="my-4" />

			{/* <Link to="/">
				<span className="btn btn-primary btn-lg" role="button">
					Back home
				</span>
			</Link> */}
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
