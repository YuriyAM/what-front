import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActions } from '@/shared';
import { globalLoadStudentGroups, loadActiveStudents } from '@/models';
import { Tab, Tabs } from '@/components';
import { CourseDetails, EditStudentsDetails } from '@/features';

export const StudentsTabs = ({index}) => {
  const { id } = useParams();

  const [fetchStudents, fetchGroups] = useActions([loadActiveStudents, globalLoadStudentGroups]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return (
    <Tabs defaultIndex={index} className='container w-50' linkBack='/students'>
      <Tab title='Student details'>
        <CourseDetails id={id} />
      </Tab>
      <Tab title='Edit student details'>
        <EditStudentsDetails id={id} />
      </Tab>
    </Tabs>
  );
}