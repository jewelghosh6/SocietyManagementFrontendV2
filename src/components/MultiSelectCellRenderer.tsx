// import React, { FC, useState } from 'react';
// import Select from 'react-select';


// // Interface for option object
// interface Option {
//     value: string;
//     label: string;
//     options?: Option[]; // Optional nested options for groups
// }



// const MultiSelectCellRenderer: FC<{ value: string | undefined }> = ({ value }) => {
//     const [selectedValue, setSelectedValue] = useState(value || []);

//     const handleChange = (newValue: any) => {
//         setSelectedValue(newValue);
//     };
//     const options = [
//         { value: 'chocolate', label: 'Chocolate' },
//         { value: 'strawberry', label: 'Strawberry' },
//         { value: 'vanilla', label: 'Vanilla' }
//     ]

//     return (
//         <Select
//             value={selectedValue}
//             onChange={handleChange}
//             options={options}
//             isMulti
//         />
//     );
// };

// export default MultiSelectCellRenderer;
