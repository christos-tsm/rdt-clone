import React from 'react'
import { GetServerSidePropsContext, NextPage } from 'next'
import { doc, getDoc } from 'firebase/firestore'
import safeJsonStrigify from 'safe-json-stringify';
import { Community } from '../../../atoms/communitiesAtom'
import { firestore } from '../../../firebase/clientApp'
import NotFound from '../../../components/Community/NotFound';
import CommunityHeader from '../../../components/Community/Header';
import PageContent from '../../../components/Layout/PageContent';

const CommunityPage: NextPage<{ communityData: Community }> = ({ communityData }) => {
    if (!communityData) {
        return <NotFound />
    }
    return (
        <>
            <CommunityHeader communityData={communityData} />
            <PageContent>
                <>LHS</>
                <>RHS</>
            </PageContent>
        </>
    )
}

export default CommunityPage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', ctx.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStrigify({
                    id: communityDoc.id,
                    ...communityDoc.data()
                })) : ""
            }
        }

    } catch (err: any) {
        /**
         * @todo error page
         */
        console.log('GetServerSideProps error: ', err.message);
    }
}