import React from 'react';
import img1 from '../CaseStudy/care.jpg';
import img2 from '../CaseStudy/img.jpg';
import img3 from '../CaseStudy/patient.jpg';
import '../Services/Services.css'
const sectionClasses = "bg-background text-foreground py-12";
const containerClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center";
const headingClasses = "text-3xl font-semibold md:font-extraboldtext-primary ";
const paragraphClasses = "mt-4 text-lg text-muted-foreground";
const wrapperClasses = "bg-white p-6 rounded-lg shadow-lg overflow-hidden"; // Wrapper box styles
const gridClasses = "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"; // Grid layout for responsive design
const caseStudyClasses = "flex flex-col items-center text-center shadow-lg  ";
const imageClasses = "rounded-lg shadow-lg  sm:w-[25vw]  h-auto ";


const CaseStudies = () => {
  return (
    <>
    <div className={sectionClasses}>
      <div className={containerClasses}>
        <h2 className={headingClasses}>Latest Case Studies</h2>

        <p className={paragraphClasses}>
          Explore our most recent case studies showcasing innovative research and successful projects in diagnostics and laboratory technology.
        </p>
      </div>
      <div className={wrapperClasses} >
        <div className={gridClasses}>
          <div className={caseStudyClasses + "p-2 rounded-lg overflow-hidden" }  data-aos="fade-down-right" data-aos-duration="2000">
            <CaseStudyImage
              src="https://websitedemos.net/diagnostics-lab-02/wp-content/uploads/sites/662/2020/08/diagnostic-lab-case-gallery-6.jpg"
              alt="Microscopic view of cells" 
            />
            <h3 className="text-xl font-semibold mt-4">Advanced Microscopy Techniques</h3>
            <p className="text-muted-foreground text-base mt-2 ">
              Our latest research in microscopy has led to groundbreaking techniques that enhance cell imaging and provide unprecedented detail.
            </p>
          </div>
          <div className={caseStudyClasses+ "p-2 rounded-lg overflow-hidden"} data-aos="flip-down" data-aos-duration="2000">
            <CaseStudyImage
              src="https://websitedemos.net/diagnostics-lab-02/wp-content/uploads/sites/662/2020/08/diagnostic-lab-case-gallery-1.jpg"
              alt="Scientist working in a lab"
            />
            <h3 className="text-xl font-semibold mt-4">Innovative Laboratory Practices</h3>
            <p className="text-muted-foreground text-base mt-2">
              Discover how our lab is implementing new practices to improve efficiency and accuracy in diagnostic testing and research.
            </p>
          </div>
          <div className={caseStudyClasses+ "p-2 rounded-lg overflow-hidden"}  data-aos="fade-down-left" data-aos-duration="2000" >
            <CaseStudyImage
              src="https://websitedemos.net/diagnostics-lab-02/wp-content/uploads/sites/662/2020/08/diagnostic-lab-case-gallery-2.jpg"
              alt="Close-up of a microscope"
            />
            <h3 className="text-xl font-semibold mt-4 ">Microscope Technology Evolution</h3>
            <p className="text-muted-foreground text-base mt-2">
              A deep dive into the evolution of microscope technology and its impact on research and diagnostics in modern labs.
            </p>
          </div>
          <div className={caseStudyClasses+ "p-2 rounded-lg overflow-hidden"}  data-aos="fade-down-right" data-aos-duration="2000" >
            <CaseStudyImage
              src="https://websitedemos.net/diagnostics-lab-02/wp-content/uploads/sites/662/2020/08/diagnostic-lab-case-gallery-3.jpg"
              alt="Pipette and test tubes"
            />
            <h3 className="text-xl font-semibold mt-4">Precision in Sample Handling</h3>
            <p className="text-muted-foreground text-base mt-2">
              Learn about our techniques for ensuring precision in sample handling and preparation, crucial for accurate diagnostic results.
            </p>
          </div>
          <div className={caseStudyClasses+ "p-2 rounded-lg overflow-hidden"} data-aos="flip-down" data-aos-duration="2000">
            <CaseStudyImage
              src="https://websitedemos.net/diagnostics-lab-02/wp-content/uploads/sites/662/2020/08/diagnostic-lab-case-gallery-4.jpg"
              alt="Scientist using a microscope"
            />
            <h3 className="text-xl font-semibold mt-4">Breakthroughs in Diagnostic Research</h3>
            <p className="text-muted-foreground text-base mt-2">
              This case study highlights recent breakthroughs in diagnostic research, showcasing the latest advancements in our field.
            </p>
          </div>
          <div className={caseStudyClasses+ "p-2 rounded-lg overflow-hidden"}  data-aos="fade-down-left" data-aos-duration="2000" >
            <CaseStudyImage
              src="https://websitedemos.net/diagnostics-lab-02/wp-content/uploads/sites/662/2020/08/diagnostic-lab-case-gallery-5.jpg"
              alt="Scientist handling a vial"
            />
            <h3 className="text-xl font-semibold mt-4">Revolutionizing Sample Analysis</h3>
            <p className="text-muted-foreground text-base mt-2">
              Explore how our new methods in sample analysis are revolutionizing laboratory practices and improving diagnostic accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
{/* <div style={{justifyContent:"space-evenly",}}>

    <div >
    <h2 className={headingClasses}>Patient Care Attendants</h2>
    <img src={img1} className='img1' />
    <p  className ="paragrap">
    Doctors diagnose disease, provide treatment,<br></br>  counsel patients with injuries, diseases or illnesses.             </p>

    </div>
    <div>
    <img src={img2}  className="img2"/>
    <p className='para'>
    Patient care ensures that the patient is kept happy and<br></br> comfortable with their wellbeing in mind.
    </p>

    </div>
    <div>
    <img src={img3}  className='img3'/>
    <p className='par'>
    A data management system that facilitates processing of patient information.
    </p>

    </div>
    </div>

<br></br>
 */}

 {/* <div className='sai'>
  <div className='attendants-div'>
  <img src={img1} className='attendants-img' />
  <p  className ="paragrap">
    Doctors diagnose disease, provide treatment,  counsel patients <br></br>with injuries,diseases or illnesses. </p>


  </div>
  <div className='attendants-div'>
  <img src={img2}  className="attendants-img"/>
  <p className='paragrap'>
    Patient care ensures that the patient is kept happy 
     and comfortable with their wellbeing in mind.
    </p>


  </div>
  <div className='attendants-div'>
  <img src={img3}  className='attendants-img'/>
  <p className='paragrap'>
    A data management system that facilitates processing of patient information.
    </p>

  </div>
 </div> */}


<h2 className={headingClasses}>Patient Care Attendants</h2>

<div className="flex flex-col md:flex-row md:justify-center gap-6 mt-5 overflow-hidden">
  {/* Doctor Care Section */}
  <div className="flex flex-col w-full md:w-[45vw] lg:w-[30vw] items-center text-center md:attendants-div"  data-aos="zoom-in" data-aos-duration="2000" >
    <img 
      src={img1} 
      className="h-[200px] w-[320px] rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
      alt="Doctor providing care to a patient" 
      aria-label="Doctor Care"
    />
    <p className="text-gray-800 text-base  leading-relaxed">
    {/* <p className="text-gray-800 w-[20] sm-w-[30vw] text-base leading-relaxed"> */}
      Doctors diagnose disease, provide treatment, counsel patients with injuries, diseases, or illnesses.
    </p>
  </div>

  {/* Patient Care Section */}
  <div className="flex flex-col w-full md:w-[45vw] lg:w-[30vw] items-center text-center md:attendants-div " data-aos="zoom-in-up" data-aos-duration="2000" >
    <img 
      src={img2} 
      className="h-[200px] w-[320px] rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
      alt="Nurse providing patient care" 
      aria-label="Patient Care"
    />
    <p className="text-gray-800 text-base leading-relaxed mt-4">
      Patient care ensures that the patient is kept happy and comfortable with their wellbeing in mind.
    </p>
  </div>

  {/* Data Management Section */}
  <div className="flex flex-col w-full md:w-[45vw] lg:w-[30vw] items-center text-center md:attendants-div"data-aos="zoom-in-left" data-aos-duration="2000"  >
    <img 
      src={img3} 
      className="h-[200px] w-[320px] rounded-lg shadow-md hover:scale-105 transition-transform duration-300" 
      alt="Data management system" 
      aria-label="Data Management"
    />
    <p className="text-gray-800 text-base leading-relaxed mt-4">
      A data management system that facilitates processing of patient information.
    </p>
  </div>
</div>


    </>

  );
};

const CaseStudyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className={imageClasses} />;
};


{/* <div>
  <h2>Digital Mobile X-Ray
  </h2>
</div> */}

export default CaseStudies;
