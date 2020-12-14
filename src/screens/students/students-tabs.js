import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import { loadActiveStudents } from '@/models';
import { Tab, Tabs } from '@/components';
import { EditStudentsDetails } from '@/features';

export const StudentsTabs = ({index}) => {
  const { id } = useParams();

  const fetchStudents = useActions(loadActiveStudents);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <Tabs defaultIndex={index} className='container w-50' linkBack='/students'>
      <Tab title='Student details'>
        <EditStudentsDetails id={id} />
      </Tab>
      <Tab title='Edit student details'>
        <EditStudentsDetails id={id} />
      </Tab>
    </Tabs>
  );
}