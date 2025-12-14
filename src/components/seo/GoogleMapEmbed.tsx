const GoogleMapEmbed = () => {
  return (
    <section className="py-12 bg-muted" aria-label="Location and Contact Information">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Serving Broward, Miami-Dade & Palm Beach County
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional cleaning services throughout South Florida. 
            <a 
              href="https://www.broward.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Broward County
            </a>, 
            <a 
              href="https://www.miamidade.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Miami-Dade County
            </a>, and 
            <a 
              href="https://www.pbcgov.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              Palm Beach County
            </a>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          {/* NAP Information */}
          <div className="bg-card p-8 rounded-xl shadow-soft border border-border">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Contact TIDYWISE
            </h3>
            
            <address className="not-italic space-y-4">
              <div>
                <p className="font-semibold text-foreground">TIDYWISE Cleaning Services</p>
                <p className="text-muted-foreground">65 SW 12th Ave</p>
                <p className="text-muted-foreground">Deerfield Beach, FL 33442</p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Phone:</strong>{" "}
                  <a 
                    href="tel:+15615718725" 
                    className="text-primary hover:underline"
                    aria-label="Call TIDYWISE at 561-571-8725"
                  >
                    (561) 571-8725
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Email:</strong>{" "}
                  <a 
                    href="mailto:support@tidywisecleaning.com" 
                    className="text-primary hover:underline"
                  >
                    support@tidywisecleaning.com
                  </a>
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground">
                  <strong>Hours:</strong> Mon-Fri 7AM-7PM, Sat 8AM-5PM
                </p>
              </div>
            </address>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Service Areas:</strong> Broward County, Miami-Dade County, Palm Beach County, 
                Fort Lauderdale, Miami, West Palm Beach, Boca Raton, Coral Springs, Hollywood, 
                Pompano Beach, Deerfield Beach, and surrounding areas.
              </p>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded-xl overflow-hidden shadow-soft h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.8!2d-80.0944!3d26.3182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d91a1234567890%3A0xabcdef123456!2s65%20SW%2012th%20Ave%2C%20Deerfield%20Beach%2C%20FL%2033442!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TIDYWISE Cleaning Services Location - 65 SW 12th Ave, Deerfield Beach, FL 33442"
              aria-label="Google Maps showing TIDYWISE location in Deerfield Beach, Florida"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapEmbed;
