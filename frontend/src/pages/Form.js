import React, { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import '../styles/Form.css';
import UserTile from '../components/UserTile';

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const validationSchema = Yup.object().shape({
	userName: Yup.string().required('First Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	phone: Yup.string()
		.matches(phoneRegex, 'Invalid phoneNumber')
		.required('Phone is required'),
});

const Form = () => {
	const [users, setUsers] = useState([]);
	const [visible, setVisible] = useState(false);
	const columns = useMemo(
		() => [
			{
				Header: 'UserName',
				accessor: 'userName',
			},
			{
				Header: 'Email',
				accessor: 'email',
			},

			{
				Header: 'Phone_Number',
				accessor: 'phone',
			},
		],
		[]
	);

	const formik = useFormik({
		initialValues: {
			userName: '',
			email: '',
			phone: ' ',
		},
		validationSchema: validationSchema,

		onSubmit: (values) => {
			console.log('Form data', values);
			setUsers([...users, values]);
		},
	});
	console.log(users);
	return (
		<div className="container">
			{!visible && (
				<form
					className="form-wrapper"
					onSubmit={formik.handleSubmit}
				>
					<div>
						<span className="icon-input-field">
							<PersonIcon className="icon" />
							<input
								type="text"
								id="userName"
								name="userName"
								placeholder="UserName..."
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.userName}
							/>
							{formik.touched.userName && formik.errors.userName ? (
								<div className="error">{formik.errors.userName}</div>
							) : null}
						</span>
					</div>
					<div>
						<span className="icon-input-field">
							<EmailIcon className="icon" />
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Email..."
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email ? (
								<div className="error">{formik.errors.email}</div>
							) : null}
						</span>
					</div>

					<div>
						<span className="icon-input-field">
							<PhoneIcon className="icon" />
							<input
								type="number"
								id="phone"
								name="phone"
								placeholder="Phone Number..."
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.phone}
							/>
							{formik.touched.phone && formik.errors.phone ? (
								<div className="error">{formik.errors.phone}</div>
							) : null}
						</span>
					</div>
					<div className="btn">
						<button className="cancel">Cancel</button>
						<button
							type="submit"
							className="submit"
						>
							Submit
						</button>
					</div>
				</form>
			)}

			<div>
				{users && (
					<UserTile
						columns={columns}
						data={users}
						setUsers={(data) => setUsers(data)}
						visible={visible}
						setVisible={(state) => setVisible(state)}
					/>
				)}
			</div>
		</div>
	);
};

export default Form;
