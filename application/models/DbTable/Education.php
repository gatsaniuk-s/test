<?php

class Application_Model_DbTable_Education extends Zend_Db_Table_Abstract
{

    protected $_name = 'educations';

    public function getTitle()
    {
        $query = $this->select()
            ->from(array('e' => 'educations'), array('id', 'title'));

        return $this->fetchAll($query)->toArray();
    }
}

