// import AdminLayout from '@/Layouts/AdminLayout';
// import { Head, Link, router } from '@inertiajs/react';
// import { useState } from 'react';
// import MasterTable, {
//     TableBody,
//     TableTd,
// } from "@/Components/elements/tables/masterTable";
// import { PrimaryButton, PrimaryLink } from '@/Components/elements/buttons/PrimaryButton';




// export default function Dashboard({
//     admins,
//     filters,
// }: {
//     admins: any;
//     filters: any;
// }) {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedAdmin, setselectedAdmin] = useState<any>(null);
//     const [isEditing, setIsEditing] = useState(false);

//     const openModal = (admin: any) => {
//         setselectedAdmin(admin);
//         setIsEditing(true);
//         setIsModalOpen(true);
//     };

//     const openAddModal = () => {
//         setselectedAdmin({ first_name: '', last_name: '', email: '', password: '' });
//         setIsEditing(false);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setselectedAdmin(null);
//         setIsModalOpen(false);
//     };

//     const handleFormSubmit = (e: any) => {
//         e.preventDefault();

//         if (isEditing) {
//             router.patch(route("admins.update", { id: selectedAdmin.id }), selectedAdmin, {
//                 onSuccess: () => {

//                     closeModal();

//                 },
//             });
//         } else {
//             router.post(route("admins.store"), selectedAdmin, {
//                 onSuccess: () => {
//                     closeModal();


//                 },
//             });
//         }
//     };

//     const tableColumns = [
//         {
//             label: "",
//             sortField: "",
//             sortable: false,
//         },
//         {
//             label: "First Name",
//             sortField: "first_name",
//             sortable: true,
//         },
//         {
//             label: "Last Name",
//             sortField: "last_name",
//             sortable: true,
//         },
//         {
//             label: "Email",
//             sortField: "email",
//             sortable: true,
//         },

//     ];

//     const createLink = {
//         url: "#",
//         label: "Add New Student",
//         onClick: openAddModal,
//     };

//     const search = {
//         placeholder: "Search Here",
//     };


//     return (
//         <AdminLayout  bRoutes={undefined}>
//             <Head title="Student Dashboard" />

//             <div className="max-w-7xl w-full mt-16 mx-auto overflow-hidden ">
//                 <div className="flex justify-between items-center mb-2"> {/* Flex container for heading and button */}
//                     <h2 className="text-[16px] ml-3 mt-3 font-semibold text-gray-800">Admin Details</h2> {/* Heading */}
//                     <PrimaryButton onClick={openAddModal} className="bg-blue-500 mr-3 text-white  mt-2 rounded-lg ">
//                         Add New Admin
//                     </PrimaryButton>
//                 </div>
//                 <MasterTable
//                     tableColumns={tableColumns}
//                     filters={[filters]}
//                     url={route("")}
//                     createLink={createLink}
//                     search={search}
//                     links={admins.meta.links}
//                 >
//                     {admins.data.map((admin: any) => (
//                         <TableBody
//                             buttons={
//                                 <>
//                                     <div className="flex items-center flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
//                                         <PrimaryButton

//                                             onClick={() => openModal(admin)}
//                                         >
//                                             Edit
//                                         </PrimaryButton>
//                                     </div>
//                                     <div className="flex items-center flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
//                                         <PrimaryLink
//                                             href={route("admins.destroy", { id: admin.id })}
//                                             method="delete"
//                                             className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-lg text-white inline-block transition duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//                                         >
//                                             Delete
//                                         </PrimaryLink>
//                                     </div>
//                                 </>
//                             }
//                             key={admin.id}
//                         >
//                             <TableTd>
//                                 {admin.first_name}
//                             </TableTd>
//                             <TableTd>
//                                 {admin.last_name}
//                             </TableTd>
//                             <TableTd>
//                                 {admin.email}
//                             </TableTd>
//                         </TableBody>
//                     ))}
//                 </MasterTable>
//             </div>



//             {/* Modal for editing or adding student details */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-96 w-full">
//                         <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Admin" : "Add Admin"}</h2>
//                         <form onSubmit={handleFormSubmit}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">First Name</label>
//                                 <input
//                                     type="text"
//                                     value={selectedAdmin.first_name}
//                                     onChange={(e) => setselectedAdmin({ ...selectedAdmin, first_name: e.target.value })}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">Last Name</label>
//                                 <input
//                                     type="text"
//                                     value={selectedAdmin.last_name}
//                                     onChange={(e) => setselectedAdmin({ ...selectedAdmin, last_name: e.target.value })}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                                 <input
//                                     type="email"
//                                     autoComplete="off"
//                                     value={selectedAdmin.email}
//                                     onChange={(e) => setselectedAdmin({ ...selectedAdmin, email: e.target.value })}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"

//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">Password</label>
//                                 <input
//                                     type="password"
//                                     autoComplete="off"
//                                     value={selectedAdmin.password}
//                                     onChange={(e) => setselectedAdmin({ ...selectedAdmin, password: e.target.value })}
//                                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                                 />
//                             </div>
//                             <div className="flex justify-end space-x-3">
//                                 <button
//                                     type="button"
//                                     onClick={closeModal}
//                                     className="bg-white text-black border border-gray-500 py-2 px-4 rounded-lg hover:bg-gray-100"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <PrimaryButton
//                                     type="submit"
//                                     className="bg-blue-500 text-white py-2 px-4 rounded-lg"
//                                 >
//                                     {isEditing ? "Save" : "Add"}
//                                 </PrimaryButton>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </AdminLayout>
//     );
// }
