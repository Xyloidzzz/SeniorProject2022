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



const GradeTable = ({rdata,cdata}) => {

  
  const row = rdata;
  const col = cdata;
  
    const assignment = [];
    const a =[];
    const b =[];
    const c =['Alfredo Pena', 'Jesus Mendez', 'Jaehun Kim', 'John Doe', 'Diego Rivera', 'Peter Parker', 'Nathan Drake'];
    const s = [];

   
   for(let i = 0; i < row; i++){            //Row goes here 
     assignment[i] = 'Assignment'+(i+1);
   } 
   
   for(let i = 0; i<assignment.length; i++){
    a[i] = <Th isNumeric>{ assignment[i] }</Th>;
    b[i] = <GradeCell
    defaultValue='100'
    studentName={c[i]}
    assignment={assignment[i]}
  />
   }

   for(let i=0; i<col; i++){
      s[i] = <Tr><Td>{c[i]}</Td>{b}</Tr>  
   }
   
  
  return (
    <Table variant='unstyled'>
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
