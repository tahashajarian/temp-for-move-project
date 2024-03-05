import {CheckBoxNodeType} from "./CheckBoxTree";

const checkBoxFakeData:CheckBoxNodeType[] = [
  {
    label: '1',
    value: 'permission-1',
    children: [
      {
        label: '1-1',
        value: 'permission-1-1',
        children: [],
      },
      {
        label: '1-2',
        value: 'permission-1-2',
        children: [],
      },
      {
        label: '1-3',
        value: 'permission-1-3',
        children: [
          {
            label: '1-3-1',
            value: 'permission-1-3-1',
            children: [],
          },
          {
            label: '1-3-2',
            value: 'permission-1-3-2',
            children: [],
          },
          {
            label: '1-3-3',
            value: 'permission-1-3-3',
            children: [
              {
                label: '1-3-3-1',
                value: 'permission-1-3-3-1',
                children: [],
              },
              {
                label: '1-3-3-2',
                value: 'permission-1-3-3-2',
                children: [],
              },
              {
                label: '1-3-3-3',
                value: 'permission-1-3-3-3',
                children: [
                  {
                    label: '1-3-3-3-1',
                    value: 'permission-1-3-3-3-1',
                    children: [],
                  },
                  {
                    label: '1-3-3-3-2',
                    value: 'permission-1-3-3-3-2',
                    children: [],
                  },
                  {
                    label: '1-3-3-3-3',
                    value: 'permission-1-3-3-3-3',
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  },
  {
    label: 'دسترسی اصلی 2',
    value: 'main-permission-2',
    children: [
      {
        label: 'دسترسی فرعی 2-1',
        value: 'sub-permission-2-1',
        children: [],
      },
      {
        label: 'دسترسی فرعی 2-2',
        value: 'sub-permission-2-2',
        children: [],
      },
    ]
  },
  {
    label: 'دسترسی اصلی 3',
    value: 'main-permission-3',
    children: []
  },
]

export default checkBoxFakeData