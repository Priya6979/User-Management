import React, { useState } from 'react';
import { useTable } from 'react-table';
import '../styles/UserTile.css';

const UserTile = ({ columns, data, setUsers, setVisible, visible }) => {
	const [updatedData, setUpdatedData] = useState({});
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState(0);

	const handleDelete = (e, index) => {
		const copydata = [...data];
		if (index !== -1) {
			copydata.splice(index, 1);
		}
		setUsers(copydata);
	};
	console.log('dataaaa', data);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	const handleUpdate = (e, index) => {
		// e.preventDefault();
		// const copydata = [...list];
		// copydata[index] = update;
		// setList(copydata);
		// setVisible(false);
		console.log(index);
		e.preventDefault();

		updatedData.userName = userName;
		updatedData.email = email;
		updatedData.phone = phone;
		const copydata = [...data];
		copydata[index] = updatedData;
		if (updatedData) {
			setUsers(copydata);
		}

		setVisible(!visible);
	};
	console.log('updated dataaaaa', updatedData);
	return (
		<div className="table-container">
			<table {...getTableProps()}>
				<thead className="table-header">
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render('Header')}</th>
							))}
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					))}
				</thead>

				<tbody {...getTableBodyProps()}>
					{rows.map((row, index) => {
						prepareRow(row);

						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									);
								})}
								<td>
									{visible && (
										<form
											className="modal"
											onSubmit={(e) => handleUpdate(e, index)}
										>
											<input
												type="text"
												onChange={(e) => setUserName(e.target.value)}
												placeholder="Name..."
											/>
											<input
												type="email"
												onChange={(e) => setEmail(e.target.value)}
												placeholder="Email..."
											/>
											<input
												type="number"
												onChange={(e) => setPhone(e.target.value)}
												placeholder="Phone No. ..."
											/>
											<button type="submit">Update Changes</button>
										</form>
									)}
									<button
										className="edit-btn"
										onClick={(e) => setVisible(!visible)}
									>
										Edit
									</button>
								</td>
								<td>
									<button
										className="del-btn"
										onClick={(e) => handleDelete(e, index)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default UserTile;
