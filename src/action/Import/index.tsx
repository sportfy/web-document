import { memo, useState } from 'react'
import Dropdown from 'antd/es/dropdown'
import Button from 'antd/es/button'
import message from 'antd/es/message'
import Modal from 'antd/es/modal'
import { storeHandles } from '@/utils/idb'
import { getI18n, uploadFile, getFileData } from '@/utils'

export interface ImportProps {}

/** 导入文档组件 */
export const Import = memo((props: ImportProps) => {
  const [importVisible, setImportVisible] = useState(false)
  const [exportDocuments, setExportDocuments] = useState([])

  /** 导入JSON配置文件 */
  const importJson = async () => {
    const { status, file } = await uploadFile({ accept: '.json' })

    message.success('正在为您导入文档，请稍后')

    if (status === 'success') {
      try {
        const jsonData = JSON.parse(await getFileData(file!, 'text'))
        const { exportDocuments, exportResources } = jsonData

        setExportDocuments(exportDocuments)
        console.log(11111, jsonData)
        setImportVisible(true)
      } catch (e) {
        message.success('导入失败，请确认文档内容后重试')
      }
    }
  }

  return (
    <>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            {
              key: 'json',
              label: '上传JSON文件',
              onClick: importJson,
            },
            { key: 'url', label: '从URL导入' },
          ],
        }}
      >
        <Button size="small" className="ml-3">
          {getI18n('批量导入')}
        </Button>
      </Dropdown>

      <Modal open={importVisible} width={650} title="确认导入"></Modal>
    </>
  )
})
