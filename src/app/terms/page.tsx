'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

export default function TermsOfUse() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="calc(100vh - 64px)">
      <Container maxW="container.md" py={8}>
        <Box 
          bg={bgColor} 
          p={8} 
          borderRadius="lg" 
          boxShadow="sm"
          border="1px solid"
          borderColor={borderColor}
        >
          <VStack spacing={6} align="stretch">
            <Heading as="h1" size="xl" mb={6}>
              D2T TERMS OF USE
            </Heading>

            <Text>
              Thank you for visiting www.visitech.com (hereinafter referred to along with all associated web pages as 'website') operated by D Squared T, LLC ("D2T"). By accessing and using this and all supporting websites you agree to be bound by the following terms of use (hereinafter 'Terms of Use') and all such terms shall be deemed accepted by you. For the avoidance of doubt, D2T's obligations, if any, with regard to its products and services are governed solely by the agreements pursuant to which such products and services are provided, and nothing on this website should be construed to alter such agreements. If you enter into this agreement on behalf of an organization, you represent that you have the authority to bind the organization to the Terms of Use.
            </Text>

            <Text>
              If you disagree with any provision of these Terms of Use, you should not use this website. If you do not agree to any additional terms which apply to particular materials, content, products, services or information contained in or available through this website (including but not limited to software, audio, video, text and photographs, domain names, tagline, lay-out and user look-and-feel of this website) (the "Materials") or transactions concluded through this website (such as the purchase of D2T products and services), you should not use the part of the website which contains such Materials or through which transactions may be concluded and you should not use such Materials or conclude such transactions.
            </Text>

            <Text>
              These Terms of Use may be amended by D2T at any time. The amended Terms of Use are effective as of the date of posting on this website. Please check this webpage regularly. Additional terms and conditions may apply to specific materials or transactions concluded through this website and you may be requested to explicitly accept such terms and conditions. Such terms may be in addition to these Terms of Use or, to the extent they are inconsistent with the content or intent of these Terms of Use, such terms will supersede these Terms of Use.
            </Text>

            {/* Section 1 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                1. Proprietary Information
              </Heading>
              <Text>
                D2T holds title to all content, logos and Materials on this website which are protected trademarks, trade names, or service marks and all rights are reserved. With the exception of customer data, site content is the exclusive property of D2T. Any use of the content, including without limitation the distribution, reproduction, modification, display or transmission without the prior written consent of D2T is prohibited. All copyright and other proprietary notices of D2T or its licensors shall be retained on all reproductions.
              </Text>
            </Box>

            {/* Section 2 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                2. Ownership of Data
              </Heading>
              <Text>
                Customers who have paid subscriptions to the website shall maintain ownership of the data collected and stored by them or by a third party on their behalf. Any third party's right to store or use data on your behalf shall be pursuant to the terms set forth between you and D2T and its subsidiaries. You will be responsible to manage third party rights for storage and usage of your data.
              </Text>
            </Box>

            {/* Section 3 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                3. Confidentiality of Data
              </Heading>
              <Text>
                D2T will use all commercially reasonable efforts to treat customer data as strictly confidential and will not use this data except as expressly authorized by the customer who owns the data in question. As a customer you agree not to view, attempt to view or use data of another customer unless expressly authorized.
              </Text>
            </Box>

            {/* Section 4 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                4. Restrictions On Use
              </Heading>
              <Text>
                D2T may be used to manage your oil and gas or related operations in accordance with the terms and conditions set forth between you and D2T. You may not use this site for any other commercial purposes without D2T's express prior written consent.
              </Text>
            </Box>

            {/* Section 5 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                5. Pricing
              </Heading>
              <Text>
                As defined in the current D2T price schedule, you will be charged a standard per report fee for using D2T as well as an additional annual administration fee and other fees that may be agreed upon between the parties. The annual administration fee and the report fee will depend on services selected in the price schedule. D2T reserves the right to change prices at any time without notice, however D2T will endeavor to give one (1) month's notice whenever possible.
              </Text>
            </Box>

            {/* Section 6 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                6. Terms of Payment
              </Heading>
              <Text>
                Website accounts can be cancelled at any time with or without cause. Customer will remain liable for all charges up to the point of termination. All fees are exclusive of taxes, levies or duties and you shall be responsible for such taxes, levies or duties by relevant authorities. D2T reserves the right to charge interest on overdue accounts at the maximum rate allowed by law. D2T also reserves the right to deny your access to website services pending payment of overdue accounts.
              </Text>
            </Box>

            {/* Section 7 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                7. Marketing
              </Heading>
              <Text>
                You agree that while this Agreement is in effect and you hold an active account in good standing, D2T shall be authorized to identify you as a customer/end-user of D2T services (as applicable) in public relations and marketing materials. You can request in writing at any time that any reference to you in D2T public relations or marketing materials be removed and D2T will comply in due course within a reasonable period of time. All customer trademarks used on D2T marketing and public relations materials are the sole property of the customer and use is subject to customer terms and conditions as notified by customer.
              </Text>
            </Box>

            {/* Section 8 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                8. Solicitations and Communications
              </Heading>
              <Text>
                By signing up for and using this website, you consent to receive communications from D2T, including but not limited to promotional emails, newsletters, marketing messages, and other solicitations. These communications may be sent via email, phone, SMS, or other contact methods you provide. You may opt out of receiving promotional communications at any time by following the unsubscribe instructions included in the emails or by adjusting your account settings. Please note that opting out of marketing communications does not affect transactional or service-related communications necessary for your use of the website. D2T reserves the right to modify the types and frequency of communications sent to users at its discretion.
              </Text>
            </Box>

            {/* Section 9 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                9. Accuracy and Availability of Data and Services
              </Heading>
              <Text>
                D2T recognizes the importance of maintaining accurate and complete data for you, as well as ensuring uninterrupted access to this data. We will attempt to ensure your data on www._______.com is as accurate and up to date as possible and use commercially reasonable efforts to ensure outages are as limited in frequency and duration as practicable in the circumstances.
              </Text>
              <Text mt={4}>
                D2T does not, however, warrant that the information is or will be complete or error free and available on a continuous basis. You acknowledge and accept all risks relating to inaccurate data and service outages and must bear risks associated with reliance on the accuracy and availability such data and services. You agree to hold D2T harmless and blameless by you and free of any and all liabilities that may occur as a result of any use or application of the information provided by D2T in connection with your use of the Services.
              </Text>
            </Box>

            {/* Section 10 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                10. User Account Management and Security
              </Heading>
              <Text>
                You are responsible to manage user access to your data and for the security of your usernames and passwords. D2T will not be liable for any loss or damage to your data from your failure to comply with this security obligation. D2T can offer to assist you in managing user access if requested. When assisting you with user access D2T, cannot warrant that it has up to date knowledge of your policies and employee or contractor status and therefore does not guarantee or warrant accuracy or correctness in the performance of such services.
              </Text>
              <Text mt={4}>
                Usernames and passwords used for the website are for individual use only. A single login shared by multiple people is not permitted. You can have an unlimited number of users registered under your organization however user accounts are limited to those who work directly for your organization or on your behalf. Registering accounts for others so as to grant them access to D2T for their own use or to manage their own operations is a violation of these terms. Inviting contractors and outside personnel to work on your behalf is permitted and supported through an invitation process managed from within the website by the account holder.
              </Text>
            </Box>

            {/* Section 11 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                11. Use of Site
              </Heading>
              <Text>
                You agree to use the website for lawful purposes only. You agree not to take any action that might compromise the security of the website, render the website inaccessible to others or otherwise damage the website, content or data. You agree not to add to, subtract from or otherwise modify the content, or attempt to access any data that is not intended for you. You agree not to use the website in any manner that might interfere with the rights of third parties.
              </Text>
              <Text mt={4}>
                If you make or post comments, submit questions, information and content regarding the site or otherwise, this content shall not be offensive, defamatory or unlawful, or infringe on any patents, copyrights or trademarks or confidentiality agreements of D2T, its partners, customers, or other entities.
              </Text>
              <Text mt={4}>
                Any breach of the above conditions will result in immediate termination of your use of D2T and appropriate referral to relevant law enforcement authorities.
              </Text>
            </Box>

            {/* Section 12 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                12. Disclaimer of Warranties/Limitation of Liability
              </Heading>
              <Text>
                THIS WEBSITE AS WELL AS THE MATERIALS MADE AVAILABLE THEREBY ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. D2T AND ITS SUBSIDIARIES DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND INTELLECTUAL PROPERTY NONINFRINGEMENT. D2T DOES NOT REPRESENT OR WARRANT THAT THE WEBSITE, SUBMISSIONS, MATERIALS THEREIN ARE ACCURATE, COMPLETE, RELIABLE, CURRENT, UNINTERRUPTED, OR ERROR-FREE. D2T DOES NOT REPRESENT OR WARRANT THAT THE WEBSITE OR MATERIALS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. TO THE FULLEST EXTENT PROVIDED BY LAW, D2T WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
              </Text>
              <Text mt={4}>
                TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL D2T BE LIABLE FOR ANY DIRECT, SPECIAL, INDIRECT, OR CONSEQUENTIAL DAMAGES, OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, LOSS OF USE, LOSS OF PROFITS, LOSS OF DATA, OR THOSE RELATED TO THE USE OR EXPOSURE OF PERSONAL DATA, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE), OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF THIS WEBSITE OR THE MATERIALS CONTAINED IN OR ACCESSED THEREBY.
              </Text>
            </Box>

            {/* Section 13 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                13. Indemnity
              </Heading>
              <Text>
                YOU AGREE TO DEFEND, INDEMNIFY AND HOLD D2T HARMLESS AGAINST ANY CLAIMS OR PROCEEDINGS RESULTING FROM YOUR USE OR MISUSE OF D2T, ITS CONTENT, DATA OR SERVICES.
              </Text>
            </Box>

            {/* Section 14 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                14. Violations
              </Heading>
              <Text>
                Please report any violations of these Terms of Use to D2T at INSERT EMAIL ADDRESS.
              </Text>
            </Box>

            {/* Section 15 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                15. Applicable Law
              </Heading>
              <Text>
                When agreements are established with D2T or when not defined these Terms of Use shall be governed under the laws of the Province of Alberta and the federal laws applicable therein without giving effect to any principles of conflicts of laws, and you hereby attorn to the Courts of the Province of Alberta and agree that any proceedings will be brought in the Courts of Alberta.
              </Text>
              <Text mt={4}>
                When agreements are established with D2T these Terms of Use shall be governed by the laws of the State of Delaware, without regard for the conflict of laws principles thereof. You agree that in the event a dispute arises concerning your access or use of D2T, or any other program or service offered by D2T, that such dispute shall be resolved exclusively through an arbitration process. Unless the parties specifically agree otherwise in writing, such arbitration shall be settled by binding arbitration in accordance with the commercial arbitration rules of the American Arbitration Association. Further, you agree that any such arbitration shall be settled on an individual basis, and unless the parties agree otherwise in writing shall not be consolidated in any arbitration or suit with any claim or controversy of another party. You agree that all arbitration proceedings will be conducted in Denver, CO. You further agree that any interim or preliminary relief sought shall be brought exclusively in a court of competent jurisdiction in Denver, CO.
              </Text>
            </Box>

            {/* Section 16 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                16. Severability
              </Heading>
              <Text>
                If any provision of these Terms of Use or any portion thereof is deemed unlawful, void, or for any reason unenforceable, then that provision or portion thereof will be deemed severable from these Terms of Use and will not affect the validity and enforceability of any remaining provisions.
              </Text>
            </Box>

            {/* Section 17 */}
            <Box>
              <Heading as="h2" size="md" mb={4}>
                17. Privacy Policy
              </Heading>
              <Text>
                By agreeing to these Terms of Use, you agree that certain information about you is subject to D2T's Privacy Policy.
              </Text>
            </Box>

            <Text mt={8} fontSize="sm" color="gray.500">
              Last updated: February 24, 2025
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
} 