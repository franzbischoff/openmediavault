/**
 * This file is part of OpenMediaVault.
 *
 * @license   http://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2021 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
import { Component } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { DatatablePageConfig } from '~/app/core/components/limn-ui/models/datatable-page-config.type';

@Component({
  template: '<omv-limn-datatable-page [config]="this.config"></omv-limn-datatable-page>'
})
export class UserDatatablePageComponent {
  public config: DatatablePageConfig = {
    stateId: '9dd2c07e-4572-4112-9de7-c3ccad5ef52e',
    autoReload: false,
    remoteSorting: true,
    remotePaging: true,
    hasSearchField: true,
    rowId: 'name',
    rowEnumFmt: '{{ name }}',
    columns: [
      { name: gettext('Name'), prop: 'name', flexGrow: 1, sortable: true },
      { name: gettext('Email'), prop: 'email', flexGrow: 1, sortable: true },
      {
        name: gettext('Groups'),
        prop: 'groups',
        flexGrow: 1,
        sortable: true,
        cellTemplateName: 'template',
        cellTemplateConfig: '{{ groups | sort() | join(", ") }}'
      },
      {
        name: gettext('Comment'),
        prop: 'comment',
        cellTemplateName: 'text',
        flexGrow: 1,
        sortable: true
      }
    ],
    sorters: [
      {
        dir: 'asc',
        prop: 'name'
      }
    ],
    store: {
      proxy: {
        service: 'UserMgmt',
        get: {
          method: 'getUserList'
        }
      }
    },
    actions: [
      {
        type: 'menu',
        icon: 'add',
        tooltip: gettext('Create | Import'),
        actions: [
          {
            template: 'create',
            execute: {
              type: 'url',
              url: '/usermgmt/users/create'
            }
          },
          {
            type: 'iconButton',
            text: gettext('Import'),
            icon: 'import',
            execute: {
              type: 'url',
              url: '/usermgmt/users/import'
            }
          }
        ]
      },
      {
        template: 'edit',
        execute: {
          type: 'url',
          url: '/usermgmt/users/edit/{{ _selected[0].name }}'
        }
      },
      {
        type: 'iconButton',
        icon: 'mdi:folder-key',
        tooltip: gettext('Shared folder privileges'),
        enabledConstraints: {
          minSelected: 1,
          maxSelected: 1
        },
        execute: {
          type: 'url',
          url: '/usermgmt/users/privileges/{{ _selected[0].name }}'
        }
      },
      {
        template: 'delete',
        execute: {
          type: 'request',
          request: {
            service: 'UserMgmt',
            method: 'deleteUser',
            params: {
              name: '{{ name }}'
            }
          }
        }
      }
    ]
  };
}
