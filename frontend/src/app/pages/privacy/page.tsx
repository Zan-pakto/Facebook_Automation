import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground mt-1 text-sm font-medium">Revised: February 13th, 2026</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none text-gray-700 text-[15px] leading-relaxed">
            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">Introduction</h2>
            <p className="mb-4">
              Eniacworld is a product of Eniacworld ("Eniacworld," "we," "us," or "our"), a software company headquartered in Jaipur, Rajasthan, India.
            </p>
            <p className="mb-4">
              Eniacworld is the parent company and data controller for Eniacworld, as well as our other products, .
            </p>
            <p className="mb-4">
              This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you use the Eniacworld website located at eniacworld.com (the "Site"), the Eniacworld mobile application, the Eniacworld browser extension, and related services (collectively, the "Service").
            </p>
            <p className="mb-4">
              By using Eniacworld, you acknowledge that your information may be shared within the Eniacworld family of products as described in this Privacy Policy.
            </p>
            <p className="mb-4">
              For centralized privacy management, including submitting data requests, viewing our list of sub-processors, and obtaining a copy of our Data Processing Agreement, please visit the Eniacworld Privacy Center.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">1. Scope of This Privacy Policy</h2>
            <p className="mb-4">
              This Privacy Policy applies to personal information collected through the Eniacworld Site and Service. Because Eniacworld integrates with third-party social networks, information you provide to us or that we collect may also be accessible to those social networks and subject to their respective privacy policies. We do not control the privacy practices of third-party platforms. We encourage you to review the privacy policies of any social networks you connect to Eniacworld.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2.1 Information Collected Upon Registration</h3>
            <p className="mb-4">To access certain features of the Service, you must create a registered account. During registration, we may collect the following personally identifiable information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Full name (encrypted)</li>
              <li>Email address (encrypted)</li>
              <li>Time zone</li>
              <li>IP address (encrypted)</li>
            </ul>
            <p className="mb-4">We do not store precise physical location.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2.2 Payment Information</h3>
            <p className="mb-4">
              We use third-party payment processors to handle payments. Eniacworld uses Paddle and PayPro Global to process transactions. We do not store your full credit card number or payment details on our servers. Payment information is collected and processed directly by these providers in accordance with their respective privacy policies and PCI-DSS compliance standards.
            </p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2.3 Information from Third-Party Platforms</h3>
            <p className="mb-4">
              When you connect your social media accounts to Eniacworld, we may receive information from those platforms in accordance with their terms and your privacy settings. This may include account identifiers, profile information, and content you authorize us to access.
            </p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2.4 Automatically Collected Information</h3>
            <p className="mb-4">
              We automatically collect certain information when you use the Site, such as your browser type, device details, pages visited, and how you interact with the Site. This information is gathered through cookies and similar technologies, as described in Section 4.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Providing the Service:</strong> To operate Eniacworld, publish your content to connected social networks, and manage your account.</li>
              <li><strong className="text-gray-800">Communication:</strong> To send you service-related communications, respond to inquiries, and provide customer support.</li>
              <li><strong className="text-gray-800">Marketing:</strong> To inform you about Eniacworld and other Eniacworld products and services, . You may opt out of marketing communications at any time by following the unsubscribe instructions in any communication.</li>
              <li><strong className="text-gray-800">Improvement and Analytics:</strong> To analyze usage patterns, improve our Site and Service, and develop new features.</li>
              <li><strong className="text-gray-800">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">4. Cookies and Tracking Technologies</h2>
            <p className="mb-4">We use cookies and similar technologies to collect usage data and improve your experience. Cookies are small data files stored on your device.</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Session Cookies:</strong> Enable certain features and are deleted when you close your browser.</li>
              <li><strong className="text-gray-800">Persistent Cookies:</strong> Remain on your device and help us recognize you on subsequent visits.</li>
            </ul>
            <p className="mb-4">We do not use cookies to collect personally identifiable information. You may configure your browser to reject cookies, though this may affect the functionality of the Site. For more information, consult your browser's help documentation.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">5. Sharing of Information</h2>
            
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5.1 Sharing with Social Networks</h3>
            <p className="mb-4">The primary purpose of Eniacworld is to publish your content to social networks you have authenticated. Once content is shared to a third-party platform, its use is governed by that platform's privacy policy. For example, if you connect your Google Business account, the Google Privacy Policy will apply.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5.2 Sharing Within the Eniacworld Family of Products</h3>
            <p className="mb-4">Eniacworld is part of the Eniacworld family of products, which also includes our affiliated products. We may share your personal information, including your name, email address, account information, and commercial information, with our affiliated products for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>To provide you with information about other Eniacworld products and services that may be of interest to you</li>
              <li>To enable a unified customer experience across our product family</li>
              <li>To advance our legitimate commercial and business interests</li>
            </ul>
            <p className="mb-4">If you prefer not to receive marketing communications from other Eniacworld products, you may opt out by following the unsubscribe instructions in any communication, submitting a privacy request, or contacting us at privacy@eniacworld.com.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5.3 Sharing with Service Providers</h3>
            <p className="mb-4">We engage third-party service providers to perform functions on our behalf, such as hosting, analytics, payment processing, and customer support. These providers have access to your personal information only as necessary to perform their services and are contractually obligated to protect your information.</p>
            <p className="mb-4">For a complete list of our sub-processors, please visit our Sub-processors List.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5.4 Legal Disclosures</h3>
            <p className="mb-4">We may disclose your information if required by law, regulation, legal process, or governmental request, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">6. Data Retention</h2>
            <p className="mb-4">We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
            <p className="mb-4"><strong className="text-gray-800">Account Deletion:</strong> When you delete your account, we retain your data for 7 days to allow for recovery. After this period, all data is permanently deleted. If you need immediate deletion, contact the Eniacworld support team at support@eniacworld.com.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">7. Data Security</h2>
            <p className="mb-4">We implement administrative, technical, and physical safeguards designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and secure data storage.</p>
            <p className="mb-4"><strong className="text-gray-800">ISO/IEC 27001 Certification:</strong> Eniacworld is ISO/IEC 27001 certified, demonstrating our commitment to information security management best practices. You may verify our certification here.</p>
            <p className="mb-4">However, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security, and you transmit information to us at your own risk. In the event of a data breach affecting your personal information, we will notify you in accordance with applicable law.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">8. International Data Transfers</h2>
            <p className="mb-4">Eniacworld is operated from servers located in Frankfurt, Germany. If you access the Service from outside Germany, your information will be transferred to, processed, and stored in Germany.</p>
            <p className="mb-4">For users in the European Economic Area, United Kingdom, or Switzerland, we rely on appropriate legal mechanisms to transfer personal information, including Standard Contractual Clauses where applicable.</p>
            <p className="mb-4">By using the Service, you consent to the transfer of your information to Germany and other jurisdictions where Eniacworld or its service providers operate.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">9. Your Rights and Choices</h2>
            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong className="text-gray-800">Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong className="text-gray-800">Deletion:</strong> Request deletion of your personal information, subject to legal exceptions. You may also delete your account directly by following these instructions.</li>
              <li><strong className="text-gray-800">Restriction:</strong> Request that we restrict processing of your information in certain circumstances.</li>
              <li><strong className="text-gray-800">Portability:</strong> Request your information in a structured, commonly used, machine-readable format.</li>
              <li><strong className="text-gray-800">Objection:</strong> Object to processing based on legitimate interests or for direct marketing purposes.</li>
              <li><strong className="text-gray-800">Withdrawal of Consent:</strong> Where processing is based on consent, withdraw your consent at any time.</li>
            </ul>
            <p className="mb-4">To exercise any of these rights, please submit a privacy request or contact us at privacy@eniacworld.com. We may verify your identity before processing your request and will respond within the timeframes required by applicable law.</p>
            <p className="mb-4">If you have connected social network accounts to Eniacworld, you may revoke our access at any time through your account settings or directly through the social network's security settings. For example, you may revoke access to Google services at Google Security Settings.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">10. Children's Privacy</h2>
            <p className="mb-4">Eniacworld is not intended for use by individuals under the age of 13 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will promptly delete that information.</p>
            <p className="mb-4">If you believe a child has provided us with personal information, please submit a privacy request or contact us at privacy@eniacworld.com.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">11. Third-Party Links</h2>
            <p className="mb-4">The Site may contain links to third-party websites. We are not responsible for the privacy practices of those websites. We encourage you to review the privacy policies of any third-party sites you visit.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">12. Information for European Economic Area, United Kingdom, and Swiss Users (GDPR)</h2>
            <p className="mb-4">If you are located in the European Economic Area ("EEA"), United Kingdom ("UK"), or Switzerland, the following additional information applies to you under the General Data Protection Regulation ("GDPR") and equivalent laws.</p>
            
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">12.1 Data Controller</h3>
            <p className="mb-4">Eniacworld is the data controller responsible for your personal information. Our contact details are provided in Section 15 of this Privacy Policy.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">12.2 Legal Bases for Processing</h3>
            <p className="mb-4">We process your personal information on the following legal bases:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Performance of a Contract:</strong> To provide the Service, manage your account, and fulfill our contractual obligations to you.</li>
              <li><strong className="text-gray-800">Legitimate Interests:</strong> To improve our services, conduct analytics, prevent fraud, ensure security, and market our products to you, where such interests are not overridden by your data protection rights.</li>
              <li><strong className="text-gray-800">Consent:</strong> Where you have provided consent for specific processing activities, such as receiving marketing communications or connecting third-party accounts. You may withdraw consent at any time.</li>
              <li><strong className="text-gray-800">Legal Obligation:</strong> To comply with applicable laws, regulations, and legal processes.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">12.3 Your Rights Under GDPR</h3>
            <p className="mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Right of Access:</strong> Obtain confirmation of whether we process your personal data and request a copy of such data.</li>
              <li><strong className="text-gray-800">Right to Rectification:</strong> Request correction of inaccurate or incomplete personal data.</li>
              <li><strong className="text-gray-800">Right to Erasure:</strong> Request deletion of your personal data in certain circumstances. You may also delete your account directly by following these instructions.</li>
              <li><strong className="text-gray-800">Right to Restriction:</strong> Request restriction of processing in certain circumstances.</li>
              <li><strong className="text-gray-800">Right to Data Portability:</strong> Receive your personal data in a structured, commonly used, machine-readable format and transmit it to another controller.</li>
              <li><strong className="text-gray-800">Right to Object:</strong> Object to processing based on legitimate interests or for direct marketing purposes.</li>
              <li><strong className="text-gray-800">Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent.</li>
              <li><strong className="text-gray-800">Right to Lodge a Complaint:</strong> Lodge a complaint with a supervisory authority in your country of residence.</li>
            </ul>
            <p className="mb-4">To exercise these rights, please submit a privacy request or contact us at privacy@eniacworld.com.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">12.4 International Transfers</h3>
            <p className="mb-4">When we transfer personal data outside the EEA, UK, or Switzerland, we ensure appropriate safeguards are in place, including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Transfers to countries with an adequacy decision</li>
              <li>Other lawful transfer mechanisms as permitted under applicable law</li>
            </ul>
            <p className="mb-4">For more information about our international data transfer practices or to obtain a copy of the relevant safeguards, please submit a privacy request or contact us at privacy@eniacworld.com.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">12.5 Data Processing Agreement</h3>
            <p className="mb-4">If you require a Data Processing Agreement for GDPR compliance, you may obtain one here.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">12.6 EU Representative</h3>
            <p className="mb-4">Pursuant to Article 27 of the General Data Protection Regulation (GDPR), Eniacworld has appointed the following representative in the European Union:</p>
            <div className="bg-gray-50 p-5 rounded-xl mb-4 text-sm font-mono text-gray-700 border border-border">
              EU Presence d.o.o.<br/>
              Ulica Brune Bušića 42<br/>
              10000 Zagreb, Croatia<br/>
              Email: dpo@eupresence.com
            </div>
            <p className="mb-4">You may contact our EU Representative regarding any matters related to the processing of your personal data under GDPR. You may verify our GDPR Representation Certificate here.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">13. Information for California Residents (CCPA/CPRA)</h2>
            <p className="mb-4">If you are a California resident, the following additional information applies to you under the California Consumer Privacy Act ("CCPA") as amended by the California Privacy Rights Act ("CPRA").</p>
            
            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.1 Categories of Personal Information Collected</h3>
            <p className="mb-4">In the preceding 12 months, we have collected the following categories of personal information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Identifiers:</strong> Name (encrypted), email address (encrypted), account name, IP address (encrypted)</li>
              <li><strong className="text-gray-800">Commercial Information:</strong> Products or services purchased, usage history, payment transaction records (processed by Paddle and PayPro Global)</li>
              <li><strong className="text-gray-800">Internet or Network Activity:</strong> Browsing history, interactions with the Service</li>
              <li><strong className="text-gray-800">Geolocation Data:</strong> Time zone (precise location is not collected)</li>
              <li><strong className="text-gray-800">Professional or Employment Information:</strong> If provided in your profile</li>
              <li><strong className="text-gray-800">Inferences:</strong> Preferences and characteristics derived from usage</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.2 Sources of Personal Information</h3>
            <p className="mb-4">We collect personal information from:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li>Directly from you when you register, use the Service, or communicate with us</li>
              <li>Automatically through cookies and similar technologies</li>
              <li>Third-party social networks you connect to the Service</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.3 Purposes for Collection and Use</h3>
            <p className="mb-4">We collect and use personal information for the business and commercial purposes described in Section 3 of this Privacy Policy, including providing the Service, communicating with you, marketing, and improving our products.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.4 Disclosure and Sharing of Personal Information</h3>
            <p className="mb-4">We disclose personal information to the following categories of recipients:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Service Providers:</strong> Third parties who perform services on our behalf</li>
              <li><strong className="text-gray-800">Affiliated Companies:</strong> Eniacworld's family of products, </li>
              <li><strong className="text-gray-800">Social Networks:</strong> Platforms you authorize us to connect with</li>
              <li><strong className="text-gray-800">Legal and Regulatory Authorities:</strong> When required by law</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.5 Sale and Sharing of Personal Information</h3>
            <p className="mb-4">Eniacworld does not "sell" personal information in exchange for monetary compensation. However, under the CCPA/CPRA, sharing personal information for cross-context behavioral advertising may be considered a "sale" or "share."</p>
            <p className="mb-4">We may share your personal information with our affiliated products (our affiliated products) for marketing purposes. If you wish to opt out of this sharing, you may do so by submitting a privacy request or emailing us at privacy@eniacworld.com.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.6 Your Rights Under CCPA/CPRA</h3>
            <p className="mb-4">As a California resident, you have the following rights:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
              <li><strong className="text-gray-800">Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
              <li><strong className="text-gray-800">Right to Delete:</strong> Request deletion of your personal information, subject to certain exceptions. You may also delete your account directly by following these instructions.</li>
              <li><strong className="text-gray-800">Right to Correct:</strong> Request correction of inaccurate personal information.</li>
              <li><strong className="text-gray-800">Right to Opt-Out:</strong> Opt out of the sale or sharing of your personal information.</li>
              <li><strong className="text-gray-800">Right to Limit Use of Sensitive Personal Information:</strong> Limit the use of sensitive personal information, if applicable.</li>
              <li><strong className="text-gray-800">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.7 Submitting Requests</h3>
            <p className="mb-4">To exercise your rights, you or your authorized agent may submit a privacy request or email us at privacy@eniacworld.com. We will verify your identity before processing your request. We will respond to verifiable requests within 45 days, or notify you if we require additional time (up to 90 days total).</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.8 Authorized Agents</h3>
            <p className="mb-4">You may designate an authorized agent to submit requests on your behalf. We may require verification of the agent's authority and your identity before processing such requests.</p>

            <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">13.9 Financial Incentives</h3>
            <p className="mb-4">We do not offer financial incentives for the collection, sale, or deletion of personal information.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">14. Changes to This Privacy Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting a prominent notice on the Site or by other appropriate means. Your continued use of the Service after such changes constitutes your acceptance of the updated Privacy Policy. We encourage you to review this Privacy Policy periodically.</p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 border-b border-border pb-2">15. Contact Information</h2>
            <p className="mb-4">Eniacworld is the data controller responsible for your personal information. If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:</p>

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
                  Hours: Mon-Fri 9am-6pm EST<br />
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