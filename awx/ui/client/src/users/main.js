/*************************************************
 * Copyright (c) 2016 Ansible, Inc.
 *
 * All Rights Reserved
 *************************************************/

import UsersList from './list/users-list.controller';
import UsersAdd from './add/users-add.controller';
import UsersEdit from './edit/users-edit.controller';
import { N_ } from '../i18n';

export default
angular.module('Users', [])
    .controller('UsersList', UsersList)
    .controller('UsersAdd', UsersAdd)
    .controller('UsersEdit', UsersEdit)
    .config(['$stateProvider', 'stateDefinitionsProvider',
        function($stateProvider, stateDefinitionsProvider) {
            let stateDefinitions = stateDefinitionsProvider.$get();

            // lazily generate a tree of substates which will replace this node in ui-router's stateRegistry
            // see: stateDefinition.factory for usage documentation
            $stateProvider.state({
                name: 'users',
                url: '/users',
                lazyLoad: () => stateDefinitions.generateTree({
                    parent: 'users',
                    modes: ['add', 'edit'],
                    list: 'UserList',
                    form: 'UserForm',
                    controllers: {
                        list: UsersList,
                        add: UsersAdd,
                        edit: UsersEdit
                    },
                    data: {
                        activityStream: true,
                        activityStreamTarget: 'user'
                    },
                    ncyBreadcrumb: {
                        parent: 'setup',
                        label: N_('USERS')
                    }
                })
            });
        }
    ]);