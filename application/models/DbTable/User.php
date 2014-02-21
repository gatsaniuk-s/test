<?php

class Application_Model_DbTable_User extends Zend_Db_Table_Abstract
{

    protected $_name = 'users';

    public function getData($params = array()){

        $conditions = array();

        if (isset($params['users']) && $params['users']) {
            $conditions[] = 'u.id IN ('. join(',', (array)$params['users']) .')';
        }

        if (isset($params['educations']) && $params['educations']) {
            $conditions[] = 'e.id IN ('. join(',', (array)$params['educations']) .')';
        }

        if (isset($params['cities']) && $params['cities']) {
            $conditions[] = 'c.id IN ('. join(',', (array)$params['cities']) .')';
        }

        $condition = join(' AND ', $conditions);

        $query = $this->select();
        $query->from(array('u' => 'users'), array('name'))
            ->join(array('ue' => 'usersEducations'), 'u.id = ue.user_id', false)
            ->join(array('e' => 'educations'), 'ue.education_id = e.id', array('title as titleEducation'))
            ->join(array('uc' => 'usersCities'), 'u.id = uc.user_id', false)
            ->join(array('c' => 'cities'), 'uc.city_id = c.id', array('title as titleCity'))
            ->setIntegrityCheck(false);

        if ($condition) {
            $query->where($condition);
        }

        return $this->fetchAll($query)->toArray();
    }

    public function getName()
    {
        $query = $this->select()
            ->from(array('u' => 'users'), array('id', 'name'));

        return $this->fetchAll($query)->toArray();
    }

}

