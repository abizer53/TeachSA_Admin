import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import SendMessageModal from '../SendMessagModal'
import DeclineModal from '../DeclineModal'
import VerifyConfirmationModal from '../VerifyConfirmationModal'
import BlockUnblockModal from '../BlockUnblockModal'
import LargeProfilePicModal from '../LargeProfilePicModal'
import { validateId } from '@/pages/api/validate/[id]'
import VerificationStatusModal from './VerificationStatusModal'

export default function UpperModule({ data, type, refresh, loading, setLoading }) {
  const [messageModal, setMessageModal] = useState(false)
  const [rejectionModal, setRejectionModal] = useState(false)
  const [verifyModal, setVerifyModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [statusModal, setStatusModal] = useState(false)
  const [verifyStatus, setVerifyStatus] = useState(null)
  const [openModal, setOpenModal] = useState(false)
    
  const [isVerified,setIsVerified] = useState(false)
  const blockModalHandler = () => setBlockModal(!blockModal)
  const rejectionModalHandler = () => setRejectionModal(!rejectionModal)
  const messageHandler = () => setMessageModal(!messageModal)
  const verifyModalHandler = () => setVerifyModal(!verifyModal)
  const openModalHandler = () => setOpenModal(!openModal)
  const statusModalHandler = () => setStatusModal(!statusModal)

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const [tempLoading,setTempLoading] = useState(false)
  const verificationHandler = async (id) => {
    try {
        // 🧩 Check if ID is present
        if (!id || id.trim() === '') {
            setVerifyStatus({
                success: false,
                msg: 'SA ID Missing ⚠️',
                description:
                'The user has not provided a valid SA ID. Please request the user to submit a valid SA ID before proceeding with verification.',
                color: 'text-orange-600',
            });
            setStatusModal(true);
            return;
        }
        setTempLoading(true)
        const response = await validateId(id)

        if (response?.isValid) {
            const responseDate = response?.dob;
            const dobDate = formatDate(type === 'seeker' ? data?.profile?.DOB : data?.DOB);
            const respDate = formatDate(responseDate);
            const isEqual = dobDate === respDate;

            if (isEqual) {
                setVerifyStatus({
                success: true,
                msg: 'SA ID Verified Successfully ✅',
                description:
                    'The SA ID and date of birth provided by the user have been verified and match official records. You can proceed with verification approval.',
                color: 'text-green-600',
                });
                setIsVerified(true)
            } else {
                setVerifyStatus({
                success: false,
                msg: 'Date of Birth Mismatch ⚠️',
                description:
                    'The SA ID is valid, but the date of birth entered by the user does not match the official record. Please review the information before proceeding.',
                color: 'text-yellow-600',
                });
            }
        } else {
            setVerifyStatus({
                success: false,
                msg: 'Invalid SA ID ❌',
                description:
                'The SA ID number submitted by the user appears to be invalid or could not be verified. Please confirm the details and try again if necessary.',
                color: 'text-red-600',
            });
        }

    } catch (error) {
        setVerifyStatus({
            success: false,
            msg: 'Verification Temporarily Unavailable 🌐',
            description:
                'We were unable to verify the SA ID at this time due to a temporary network issue. Please try verifying again after some time.',
            color: 'text-red-600',
            retry: true,
        });
    } finally {
        setTempLoading(false)
        setStatusModal(true)
    }
  }

  // 🧩 Auto trigger verification only if not verified
  useEffect(() => {
    if (type == 'seeker') {
      if (data?.profile?.is_sa_id_verified !== 1 && data?.profile?.is_sa_id_verified !== '1') {
        verificationHandler(data?.profile?.ID_number)
      }else{
        setIsVerified(true)
      }
    } else if (type == 'provider') {
      if (data?.is_sa_id_verified !== 1 && data?.is_sa_id_verified !== '1') {
        verificationHandler(data?.id_passport_number)
      }else{
        setIsVerified(true)
      }
    }
  }, [data, type])

  return (
    <div className="w-full">
      {openModal && (
        <LargeProfilePicModal
          source={
            type == 'seeker'
              ? data?.profile?.profile_photo || '/images/pbanner.webp'
              : data?.upload_logo || '/images/banner.webp'
          }
          handler={openModalHandler}
        />
      )}

      <div className="w-full flex items-end justify-between -mt-8 z-10 relative">
        <div className="flex items-center gap-6 px-5 w-1/2">
          <div className="relative z-10">
            {type == 'seeker' && (
              <img
                onClick={openModalHandler}
                src={
                  data?.profile?.profile_photo
                    ? data?.profile?.profile_photo
                    : '/images/pbanner.webp'
                }
                className="size-28 rounded-full object-fill shadow border-4 border-white z-10 cursor-pointer"
              />
            )}
            {type == 'provider' && (
              <img
                onClick={openModalHandler}
                src={data?.upload_logo ? data?.upload_logo : '/images/banner.webp'}
                className="h-28 w-28 rounded-full object-cover shadow border-4 border-white z-10 cursor-pointer"
              />
            )}
          </div>
          <div>
            <h4 className="text-xl text-black font-semibold font-sans mt-4">
              {type == 'seeker' ? data?.full_name : data?.company_name}
            </h4>
            {type == 'seeker' && (
              <h6 className="text-input-label font-normal text-base mb-3">
                {data?.job_category}
              </h6>
            )}
          </div>
        </div>

        {!loading && (
          <div className="flex items-center justify-end gap-5 mt-5 w-fit">
            {data?.is_verify == 0 && (
              <>
                <Button variant="green" onClick={verifyModalHandler} className="capitalize max-w-40">
                  Verify
                </Button>
                {(type == 'seeker' ? data?.profile?.is_sa_id_verified != 1 : data?.is_sa_id_verified != 1) && <Button
                  variant="yellow"
                  onClick={statusModalHandler}
                  className="capitalize w-96"
                >
                  Check SA ID Status
                </Button>}
                {(type == 'seeker' ? data?.profile?.is_sa_id_verified == 1 : data?.is_sa_id_verified == 1) && <Button
                  variant="normal"
                  className="capitalize w-80 bg-purple-400 text-white"
                >
                  SA ID Verified
                </Button>}
                <Button
                  variant="danger"
                  onClick={rejectionModalHandler}
                  className="capitalize max-w-40"
                >
                  Decline
                </Button>
              </>
            )}
            {data?.is_verify == 1 && (
              <h6 className="capitalize text-sm font-medium text-green">Verified</h6>
            )}
            {data?.is_verify == 2 && (
              <h6 className="capitalize text-sm font-medium text-danger">
                Verification Declined
              </h6>
            )}
            {data?.is_verify == 3 && (
              <h6
                className="capitalize text-sm font-medium text-yellow cursor-pointer"
                onClick={verifyModalHandler}
              >
                Requested for Reverification
              </h6>
            )}

            {data?.is_verify == 1 && (
              <Button
                variant={data?.is_block == '2' ? 'green' : 'danger'}
                onClick={blockModalHandler}
                className="max-w-40"
              >
                {data?.is_block == 2 ? 'Unblock' : 'Block'}
              </Button>
            )}
          </div>
        )}
      </div>

      {data?.is_verify == 2 && (
        <div className="bg-white p-5 rounded-lg mt-5">
          <h5 className="text-base font-medium text-danger">
            Verification Decline Reason By Admin
          </h5>
          <h6 className="text-base font-normal text-black">{data?.decline_message}</h6>
        </div>
      )}
      {data?.is_block == 2 && (
        <div className="bg-white p-5 rounded-lg mt-5">
          <h5 className="text-base font-medium text-danger">
            Admin&apos;s Reason For Blocking Account -
          </h5>
          <h6 className="text-base font-normal text-black">{data?.block_message}</h6>
        </div>
      )}

      {/* Modals */}
      {messageModal && (
        <SendMessageModal data={data} type={type} handler={messageHandler} refresh={refresh} />
      )}
      {rejectionModal && (
        <DeclineModal data={data} type={type} handler={rejectionModalHandler} refresh={refresh} />
      )}
      {verifyModal && (
        <VerifyConfirmationModal data={data} isVerified={isVerified} type={type} handler={verifyModalHandler} refresh={refresh} />
      )}
      {blockModal && (
        <BlockUnblockModal data={data} type={type} handler={blockModalHandler} refresh={refresh} />
      )}
      {statusModal && (
        <VerificationStatusModal
          status={verifyStatus}
          onClose={statusModalHandler}
          loading={tempLoading}
          onRetry={() => {
            if (type == 'seeker') verificationHandler(data?.profile?.ID_number)
            else verificationHandler(data?.id_passport_number)
          }}
        />
      )}
    </div>
  )
}
