<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {

    }

    public function getdataAction()
    {
        $get = $this->_request->getParam('data', array());

        $params = $get ? Zend_Json::decode( $get ) : array();

        $user = new Application_Model_DbTable_User();
        $users = $user->getData($params);

        echo Zend_Json::encode( $users );
        exit;
    }

    public function getusersAction()
    {
        $model = new Application_Model_DbTable_User();
        $rows = $model->getName();

        $result = array();

        foreach ($rows as $row) {
            $result[] = array( 'boxLabel' => $row['name'], 'name' => 'users', 'inputValue' => $row['id']);
        }

        echo Zend_Json::encode( $result );

        exit;
    }

    public function geteducationsAction()
    {
        $model = new Application_Model_DbTable_Education();
        $rows = $model->getTitle();

        $result = array();

        foreach ($rows as $row) {
            $result[] = array( 'boxLabel' => $row['title'], 'name' => 'educations', 'inputValue' => $row['id']);
        }

        echo Zend_Json::encode( $result );

        exit;
    }

    public function getcitiesAction()
    {
        $model = new Application_Model_DbTable_City();
        $rows = $model->getTitle();

        $result = array();

        foreach ($rows as $row) {
            $result[] = array( 'boxLabel' => $row['title'], 'name' => 'cities', 'inputValue' => $row['id']);
        }

        echo Zend_Json::encode( $result );

        exit;
    }
}

