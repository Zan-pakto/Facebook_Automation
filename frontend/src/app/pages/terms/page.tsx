import { FileText, ArrowLeft, Scale } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden py-12 px-4 md:px-12">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto z-10 relative">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="glass-panel bg-white border border-border shadow-xl rounded-3xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-muted-foreground mt-1 text-sm font-medium">Revised: February 13th, 2026</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none text-gray-700 text-[15px] leading-relaxed">
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">1. Introduction</h2>
            <p className="mb-4">
              Eniacworld (the "Service") is provided by Eniacworld ("Eniacworld," "we," "us," or "our"), a software company headquartered in Jaipur, Rajasthan, India. Eniacworld is the parent company for Eniacworld, as well as our other products, .
            </p>
            <p className="mb-4">
              The following terms and conditions govern all use of the Eniacworld website located at eniacworld.com (the "Site"), the Eniacworld mobile application, the Eniacworld browser extension, and related services (collectively, the "Service"). The Service is offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, Eniacworld's Privacy Policy) and procedures that may be published from time to time on the Site by us (collectively, the "Agreement").
            </p>
            <p className="mb-4">
              Please read this Agreement carefully before accessing or using the Service. By accessing or using any part of the Service, you agree to become bound by the terms and conditions of this Agreement. If you do not agree to all the terms and conditions of this Agreement, then you may not access the Service or use any services.
            </p>
            <p className="mb-4">
              The Service is available only to individuals who are at least 13 years old.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">2. Access to your Eniacworld Account</h2>
            <p className="mb-4">
              Subject to the terms and conditions of this Agreement, the Service is solely for User's personal use. As used herein, "User" includes also our paying customers ("Customers"). This Agreement sets forth certain terms and conditions that apply to Customers, but not other Users. In the event any Customer-specific terms or conditions conflict with any of the terms or conditions that apply to Users generally, the Customer-specific terms and conditions shall control.
            </p>
            <p className="mb-4">
              We may change, suspend, or discontinue the Service at any time, including the availability of any feature, database, or content. We may also impose limits on certain features and services or restrict User's access to parts or all of the Service without notice or liability.
            </p>
            <p className="mb-4">
              User certifies to us that if User is an individual (i.e., not a corporation) User is at least 13 years of age. User also certifies that it is legally permitted to use the Service, and takes full responsibility for the selection and use of the Service. This Agreement is void where prohibited by law, and the right to access the Service is revoked in such jurisdictions.
            </p>
            <p className="mb-4">
              User shall be responsible for obtaining and maintaining any equipment or ancillary services needed to connect to and access the Service, including, without limitation, modems, hardware, and software. User shall be responsible for ensuring that such equipment or ancillary services are compatible with the Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">3. Restrictions</h2>
            <p className="mb-4">User shall not, nor permit anyone else to, directly or indirectly:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Reverse engineer, disassemble, decompile, or otherwise attempt to discover the source code or underlying algorithms of all or any part of the Service (except that this restriction shall not apply to the limited extent restrictions on reverse engineering are prohibited by applicable local law)</li>
              <li>Modify or create derivatives of any part of the Service</li>
              <li>Rent, lease, or use the Service for timesharing or service bureau purposes</li>
              <li>Remove or obscure any proprietary notices on the Service</li>
            </ul>
            <p className="mb-4">
              As between the parties, Eniacworld shall own all title, ownership rights, and intellectual property rights in and to the Service, and any copies or portions thereof.
            </p>
            <p className="mb-4">
              User shall not use any "deep-link," "page-scrape," "robot," "spider," or other automatic device, program, algorithm, or methodology, or any similar or equivalent manual process, to access, acquire, copy, or monitor any portion of the Service or any Content, or in any way reproduce or circumvent the navigational structure or presentation of the Service or any Content, to obtain or attempt to obtain any materials, documents, or information through any means not purposely made available through the Service. We reserve the right to bar any such activity.
            </p>
            <p className="mb-4">User shall not:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Attempt to gain unauthorized access to any portion or feature of the Service, or any other systems or networks connected to the Service or to any Eniacworld server, or to any of the services offered on or through the Service, by hacking, password "mining," or any other illegitimate means</li>
              <li>Probe, scan, or test the vulnerability of the Service or any network connected to the Service, nor breach the security or authentication measures on the Service or any network connected to the Service</li>
              <li>Take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Service or Eniacworld's systems or networks, or any systems or networks connected to the Service</li>
              <li>Use any device, software, or routine to interfere or attempt to interfere with the proper working of the Service or any transaction being conducted on the Service, or with any other person's use of the Service</li>
              <li>Use the Service to spam or post content that is against the social networks' guidelines</li>
              <li>Use the Service or any Content for any purpose that is unlawful or prohibited by this Agreement</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">4. Fees and Payment</h2>
            <p className="mb-4">
              Optional paid services are available on the Service. Our order process is conducted by our online resellers PayPro Global and Paddle depending on your location and plan. PayPro Global and Paddle are the Merchant of Record for all our orders. They provide all customer service inquiries and handle returns.
            </p>
            <p className="mb-4">
              By selecting a paid service you agree to pay us the subscription fees indicated for that service. Payments will be charged on the day you sign up for a paid service and will cover the use of that service for a monthly or annual period as selected.
            </p>
            <p className="mb-4">
              Paid service fees may be fully or partially refundable in specific scenarios and it is we who determine which Customer is eligible.
            </p>
            <p className="mb-4">
              Prices for new customers, due to cost increases or other factors, may change at any time without prior notice. For existing customers, prices will not change for the duration of the subscription.
            </p>
            <p className="mb-4">Prices do not include VAT or other applicable taxes.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">5. Registration and Security</h2>
            <p className="mb-4">
              As a condition to using certain products and services of the Service, User may be required to register with Eniacworld using a social profile or with an email address and password. We reserve the right to refuse registration of, or cancel, a Eniacworld User at our discretion.
            </p>
            <p className="mb-4">
              User shall be responsible for maintaining the confidentiality of User's Eniacworld account information. User is fully responsible for all activities that occur under User's account.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">6. Third-Party Terms</h2>
            <p className="mb-4">
              Our primary purpose for using information is to publish your content on social networks you've authenticated with. We may allow you to link your account on Eniacworld with an account on a third-party social network platform, such as YouTube, and to transfer your information to and from the applicable third-party platform. Once you connect your content to a social media platform, its use will be governed by that platform's terms.
            </p>
            <p className="mb-4">
              For example, if you choose to connect your YouTube account to the Service, this connection uses YouTube's API services, and the YouTube Terms of Service will apply to you.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">7. Termination</h2>
            <p className="mb-4">
              We may terminate your access to all or any part of the Service at any time, with or without cause, with or without notice, effective immediately.
            </p>
            <p className="mb-4">
              If you wish to terminate this Agreement or your Eniacworld account, you may simply discontinue using the Service or delete your Eniacworld account by following these instructions.
            </p>
            <p className="mb-4">
              Notwithstanding the foregoing, if you have a paid account, such account can only be terminated by us if you materially breach this Agreement and fail to cure such breach within seven (7) days from our notice to you thereof; provided that, we can terminate the Service immediately as part of a general shut down of our service.
            </p>
            <p className="mb-4">
              All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">8. Content</h2>
            <p className="mb-4">
              User agrees that all content and materials (collectively, "Content") delivered via the Service or otherwise made available by us at the Site are protected by copyrights, trademarks, service marks, patents, trade secrets, or other proprietary rights and laws.
            </p>
            <p className="mb-4">
              Except as expressly authorized by us in writing, User agrees not to sell, license, rent, modify, distribute, copy, reproduce, transmit, publicly display, publicly perform, publish, adapt, edit, or create derivative works from such materials or Content.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">9. Privacy</h2>
            <p className="mb-4">
              Your use of the Service is also governed by our Privacy Policy, which is incorporated into this Agreement by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal information.
            </p>
            <p className="mb-4">
              By using the Service, you acknowledge that your information may be shared within the Eniacworld family of products as described in our Privacy Policy.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">10. Warranties</h2>
            <p className="mb-4">
              If User is a Customer, we make the following warranty to Customer: We shall use commercially reasonable efforts consistent with prevailing industry standards to provide the services in a professional and workmanlike manner that is free of defects. Customer's sole remedy, and our exclusive liability, for defects in the Service shall be for us to use commercially reasonable efforts to promptly correct such defects.
            </p>
            <p className="mb-4">Customer represents and warrants that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>With respect to all information it provides to us, Customer has the full right and authority to make such provision and to allow us to use such information to provide the Service (including, without limitation, for us to provide such information to its data providers)</li>
              <li>None of the content (e.g., posts, media) transmitted, uploaded, or otherwise distributed by it (or its partners or any third party) through use of the Service will infringe or otherwise conflict with the rights of any third party</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">11. Warranty Disclaimer</h2>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6 shadow-sm">
              <p className="text-gray-800 font-medium leading-relaxed mb-4">
                THE SERVICE IS PROVIDED "AS IS." KALEMI CODE AND ITS SUPPLIERS AND LICENSORS HEREBY DISCLAIM ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. NEITHER KALEMI CODE NOR ITS SUPPLIERS AND LICENSORS MAKES ANY WARRANTY THAT THE SERVICE WILL BE ERROR-FREE OR THAT ACCESS THERETO WILL BE CONTINUOUS OR UNINTERRUPTED.
              </p>
              <p className="text-gray-800 font-medium leading-relaxed">
                YOU UNDERSTAND THAT YOU DOWNLOAD FROM, OR OTHERWISE OBTAIN CONTENT OR SERVICES THROUGH, THE SERVICE AT YOUR OWN DISCRETION AND RISK.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">12. Limitation of Liability</h2>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6 shadow-sm">
              <p className="text-gray-800 font-medium leading-relaxed mb-4">
                IN NO EVENT SHALL ENIACWORLD, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800 font-medium">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
              <p className="text-gray-800 font-medium leading-relaxed mb-4">
                WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
              </p>
              <p className="text-gray-800 font-medium leading-relaxed">
                IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY YOU TO US, IF ANY, FOR THE SERVICE DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">13. Indemnification</h2>
            <p className="mb-4">
              You agree to indemnify and hold harmless Eniacworld, its officers, directors, employees, agents, suppliers, and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including but not limited to attorney's fees) arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Your use of and access to the Service</li>
              <li>Your violation of any term of this Agreement</li>
              <li>Your violation of any third-party right, including without limitation any intellectual property or privacy right</li>
              <li>Any claim that your Content caused damage to a third party</li>
            </ul>
            <p className="mb-4">This defense and indemnification obligation will survive this Agreement and your use of the Service.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">14. Changes to This Agreement</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace any part of this Agreement. It is your responsibility to check this Agreement periodically for changes. Your continued use of or access to the Service following the posting of any changes to this Agreement constitutes acceptance of those changes.
            </p>
            <p className="mb-4">
              We may also, in the future, offer new services and/or features through the Service (including the release of new tools and resources). Such new features and/or services shall be subject to the terms and conditions of this Agreement.
            </p>
            <p className="mb-4">
              We may also change prices of the paid plans at any time without notice. Changed prices will only affect new Customers. Current Customers will keep paying the fee they were charged at the beginning of the subscription, despite any possible change of prices or features provided in their plan.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">15. Governing Law and Dispute Resolution</h2>
            <p className="mb-4">
              This Agreement shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Any disputes arising out of or relating to this Agreement or the Service shall first be attempted to be resolved through good-faith negotiation. If such negotiation fails, the dispute shall be submitted to the competent courts of Jaipur, Rajasthan, India.
            </p>
            <p className="mb-4">
              Notwithstanding the foregoing, we may seek injunctive or other equitable relief in any court of competent jurisdiction to protect our intellectual property rights.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">16. General Provisions</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Entire Agreement:</strong> This Agreement constitutes the entire agreement between you and Eniacworld regarding the Service and supersedes all prior agreements and understandings.</li>
              <li><strong className="text-gray-800">Severability:</strong> If any provision of this Agreement is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect.</li>
              <li><strong className="text-gray-800">Waiver:</strong> No waiver of any term of this Agreement shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under this Agreement shall not constitute a waiver of such right or provision.</li>
              <li><strong className="text-gray-800">Assignment:</strong> You may not assign or transfer this Agreement, by operation of law or otherwise, without our prior written consent. We may assign this Agreement without restriction.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">17. Contact Information</h2>
            <p className="mb-4">If you have any questions about this Agreement, please contact us:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 mt-6">
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Headquarters
                </h4>
                <p className="text-sm text-gray-600 font-mono leading-relaxed">
                  Eniacworld<br />
                  Shop No F 60, Apna Bazar, Lata Cir<br />
                  Krishna Colony, Jhotwara<br />
                  Jaipur, Rajasthan 302012<br />
                  India
                </p>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span> Contact & Support
                </h4>
                <p className="text-sm text-gray-600 font-mono leading-relaxed">
                  Phone: +91 9772701985<br />
                  Hours: Mon-Fri 9am-6pm IST<br />
                  Email: support@eniacworld.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}