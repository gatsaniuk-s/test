<?php

class Application_Model_DbTable_City extends Zend_Db_Table_Abstract
{

    protected $_name = 'cities';

    public function getTitle()
    {
        $query = $this->select()
            ->from(array('c' => 'cities'), array('id', 'title'));

        return $this->fetchAll($query)->toArray();
    }
}

