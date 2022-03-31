import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from '@chakra-ui/react'
import GradeCell from '@/components/GradeCell'
import ClassTable from '@/components/ClassTable'
import React, { useState } from "react";



const GradeTable = ({tarea,tipo}) => {

    const numi = tarea.length+1;
  
    const assignment = [];
    const AssignmentType = [];
    const a =[];
    const b =[];
    const c =['Alfredo Pena', 'Jesus Mendez', 'Jaehun Kim', 'John Doe', 'Diego Rivera', 'Peter Parker', 'Nathan Drake'];
    const s = [];

    assignment.push(tarea);
    AssignmentType.push(tipo);
   
   for(let i = 0; i<assignment.length; i++){
    a[i] = <Th isNumeric>{ assignment[i] }</Th>;
    b[i] = <GradeCell
    defaultValue='0'
    studentName={c[i]}
    assignment={assignment[i]}
  />
   }

   for(let i=0; i<c.length; i++){
      s[i] = <Tr><Td>{c[i]}</Td>{b}</Tr>  
   }
   
  
  return (
    <Table variant='unstyled' >
      <Thead>
        <Tr>
          <Th>Students</Th>
          {a}
        </Tr>
      </Thead>
      <Tbody>
        {s}
      </Tbody>
    </Table>
    
  )
}

export default GradeTable
